import { sql } from "@vercel/postgres";
import crypto from "crypto";

const HASH_SALT = process.env.HASH_SALT!;
const IPINFO_TOKEN = process.env.IPINFO_TOKEN!;

function hashIp(ip: string) {
	return crypto.createHash("sha256").update(ip + ":" + HASH_SALT).digest("hex");
}

export async function ipinfoLookup(ip: string) {
	const key = hashIp(ip);
	
	// Try to get cached data from Postgres
	let cached: {
		city: string | null;
		region: string | null;
		country: string | null;
		latitude: number | null;
		longitude: number | null;
		org: string | null;
		timezone: string | null;
	} | null = null;
	
	try {
		const { rows } = await sql`
			SELECT city, region, country, latitude, longitude, org, timezone
			FROM ip_cache 
			WHERE ip_hash = ${key} 
			AND expires_at > NOW()
			LIMIT 1
		`;
		
		if (rows.length > 0) {
			cached = rows[0] as any;
		}
	} catch (error) {
		// If table doesn't exist yet, that's ok - we'll just skip caching
		console.log('Cache table not found, proceeding without cache');
	}

	if (cached) return cached;

	const resp = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}?token=${IPINFO_TOKEN}`, {
		signal: AbortSignal.timeout(1500),
	});

	if (!resp.ok) {
		const empty = { city: null, region: null, country: null, latitude: null, longitude: null, org: null, timezone: null };
		
		// Cache failed lookup for 10 minutes
		try {
			await sql`
				INSERT INTO ip_cache (ip_hash, city, region, country, latitude, longitude, org, timezone, expires_at)
				VALUES (${key}, ${empty.city}, ${empty.region}, ${empty.country}, ${empty.latitude}, ${empty.longitude}, ${empty.org}, ${empty.timezone}, NOW() + INTERVAL '10 minutes')
				ON CONFLICT (ip_hash) DO UPDATE SET
					city = EXCLUDED.city,
					region = EXCLUDED.region,
					country = EXCLUDED.country,
					latitude = EXCLUDED.latitude,
					longitude = EXCLUDED.longitude,
					org = EXCLUDED.org,
					timezone = EXCLUDED.timezone,
					expires_at = EXCLUDED.expires_at
			`;
		} catch (error) {
			// If cache table doesn't exist, that's ok
			console.log('Could not cache failed lookup');
		}
		
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

	// Cache successful lookup for 24 hours
	try {
		await sql`
			INSERT INTO ip_cache (ip_hash, city, region, country, latitude, longitude, org, timezone, expires_at)
			VALUES (${key}, ${enriched.city}, ${enriched.region}, ${enriched.country}, ${enriched.latitude}, ${enriched.longitude}, ${enriched.org}, ${enriched.timezone}, NOW() + INTERVAL '24 hours')
			ON CONFLICT (ip_hash) DO UPDATE SET
				city = EXCLUDED.city,
				region = EXCLUDED.region,
				country = EXCLUDED.country,
				latitude = EXCLUDED.latitude,
				longitude = EXCLUDED.longitude,
				org = EXCLUDED.org,
				timezone = EXCLUDED.timezone,
				expires_at = EXCLUDED.expires_at
		`;
	} catch (error) {
		// If cache table doesn't exist, that's ok
		console.log('Could not cache lookup result');
	}
	
	return enriched;
}
