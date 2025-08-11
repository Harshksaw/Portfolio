import { NextRequest, NextResponse } from "next/server";
import { ipinfoLookup } from "@/utils/ipinfo";
import { kv } from "@vercel/kv";

const TRACK_SECRET = process.env.TRACK_SECRET;

function getClientIp(req: NextRequest): string | null {
	// Try Vercel/standard headers first
	const forwarded = req.headers.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0].trim();
	// Fallback to remote address (not always available)
	// @ts-ignore
	return req.ip || null;
}

export async function POST(req: NextRequest) {
	const auth = req.headers.get("authorization");
	if (!auth || auth !== `Bearer ${TRACK_SECRET}`) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	let payload: any = {};
	try {
		payload = await req.json();
	} catch {
		return new NextResponse("Bad Request", { status: 400 });
	}


	const ip = getClientIp(req);
	let geo: {
		city: string | null;
		region: string | null;
		country: string | null;
		latitude: number | null;
		longitude: number | null;
		org: string | null;
		timezone: string | null;
	} = { city: null, region: null, country: null, latitude: null, longitude: null, org: null, timezone: null };
	if (ip) {
		geo = await ipinfoLookup(ip);
	}

	// Device info (optional, can be extended)
	const device_type = payload.device_type ?? null;
	const browser = payload.browser ?? null;
	const os = payload.os ?? null;
	const is_bot = payload.is_bot ?? null;
	const locale = payload.locale ?? null;

	// Store in KV: one list per day
	await kv.lpush(`visits:${new Date().toISOString().slice(0, 10)}`, JSON.stringify({
		ts: payload.ts,
		path: payload.path,
		referer: payload.referer ?? null,
		...geo,
		session_id: payload.session_id ?? null,
		device_type, browser, os, is_bot, locale,
	}));

	return new NextResponse(null, { status: 204 });
}
