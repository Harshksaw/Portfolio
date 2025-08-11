import Redis from "ioredis";
import crypto from "crypto";

const HASH_SALT = process.env.HASH_SALT!;
const IPINFO_TOKEN = process.env.IPINFO_TOKEN!;

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not set");
}

const redis = new Redis(redisUrl);;

function hashIp(ip: string) {
	return crypto.createHash("sha256").update(ip + ":" + HASH_SALT).digest("hex");
}

export async function ipinfoLookup(ip: string) {
	const key = `ipinfo:${hashIp(ip)}`;
	const cachedString = await redis.get(key);
	let cached: {
		city: string | null;
		region: string | null;
		country: string | null;
		latitude: number | null;
		longitude: number | null;
		org: string | null;
		timezone: string | null;
	} | null = null;
	
	if (cachedString) {
		try {
			cached = JSON.parse(cachedString);
		} catch (error) {
			console.error('Error parsing cached data:', error);
		}
	}

	if (cached) return cached;

	const resp = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}?token=${IPINFO_TOKEN}`, {
		signal: AbortSignal.timeout(1500),
	});

	if (!resp.ok) {
		const empty = { city: null, region: null, country: null, latitude: null, longitude: null, org: null, timezone: null };
		await redis.setex(key, 60 * 10, JSON.stringify(empty)); // 10 min fail cache
		return empty;
	}

	const data = await resp.json(); // { city, region, country, loc, org, timezone }
	let latitude: number | null = null, longitude: number | null = null;
	if (typeof data?.loc === "string" && data.loc.includes(",")) {
		const [lat, lng] = data.loc.split(",").map(Number);
		latitude = isFinite(lat) ? lat : null;
		longitude = isFinite(lng) ? lng : null;
	}

	const enriched = {
		city: data?.city ?? null,
		region: data?.region ?? null,
		country: data?.country ?? null,
		latitude,
		longitude,
		org: data?.org ?? null,
		timezone: data?.timezone ?? null,
	};

	await redis.setex(key, 60 * 60 * 24, JSON.stringify(enriched)); // 24h cache
	return enriched;
}
