import { NextRequest, NextResponse } from "next/server";
import { ipinfoLookup } from "@/utils/ipinfo";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";

const TRACK_SECRET = process.env.NEXT_PUBLIC_TRACK_SECRET;

function getClientIp(req: NextRequest): string | null {
	// Try Vercel/standard headers first
	const forwarded = req.headers.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0].trim();
	// Fallback to remote address (not always available)
	// @ts-ignore
	return req.ip || null;
}

export async function POST(req: NextRequest) {
	console.log('🔍 Track API called at:', new Date().toISOString());
	
	const auth = req.headers.get("authorization");
	console.log('🔑 Auth header received:', auth ? 'YES' : 'NO');
	console.log('🔑 Expected secret:', TRACK_SECRET ? 'SET' : 'NOT SET');
	
	if (!auth || auth !== `Bearer ${TRACK_SECRET}`) {
		console.log('❌ Authorization failed');
		return new NextResponse("Unauthorized", { status: 401 });
	}
	console.log('✅ Authorization successful');

	let payload: any = {};
	try {
		payload = await req.json();
		console.log('📊 Received payload:', payload);
	} catch {
		console.log('❌ Bad request - invalid JSON');
		return new NextResponse("Bad Request", { status: 400 });
	}


	const ip = getClientIp(req);
	console.log('🌐 Client IP:', ip || 'NOT FOUND');
	
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
		console.log('🔍 Looking up geolocation for IP...');
		geo = await ipinfoLookup(ip);
		console.log('📍 Geolocation result:', geo);
	} else {
		console.log('⚠️ No IP found, skipping geolocation');
	}

	// Device info (optional, can be extended)
	const device_type = payload.device_type ?? null;
	const browser = payload.browser ?? null;
	const os = payload.os ?? null;
	const is_bot = payload.is_bot ?? null;
	const locale = payload.locale ?? null;

	console.log('💾 Storing visit data in Postgres...');

	// Store in Postgres
	try {
		await sql`
			INSERT INTO visit_events
				(ts, path, referer, city, region, country, latitude, longitude,
				 session_id, device_type, browser, os, is_bot, preferred_locale)
			VALUES
				(to_timestamp(${Date.parse(payload.ts)} / 1000.0), ${payload.path}, ${payload.referer ?? null},
				 ${geo.city}, ${geo.region}, ${geo.country}, ${geo.latitude}, ${geo.longitude},
				 ${payload.session_id ?? null}, ${device_type}, ${browser}, ${os}, ${is_bot}, ${locale})
		`;
		console.log('✅ Visit data stored successfully in Postgres');
	} catch (error) {
		console.error('❌ Failed to store in Postgres:', error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}

	console.log('🎉 Visit tracking completed successfully');
	return new NextResponse(null, { status: 204 });
}
