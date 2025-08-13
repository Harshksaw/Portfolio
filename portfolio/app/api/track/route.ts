import { NextRequest, NextResponse } from "next/server";
import { ipinfoLookup } from "@/utils/ipinfo";
import { reverseGeocode } from "@/utils/geocoding";
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
	
	// IP-based location (fallback)
	let ipGeo: {
		city: string | null;
		region: string | null;
		country: string | null;
		postal_code: string | null;
		area: string | null;
		district: string | null;
		latitude: number | null;
		longitude: number | null;
		org: string | null;
		timezone: string | null;
	} = { 
		city: null, 
		region: null, 
		country: null, 
		postal_code: null,
		area: null,
		district: null,
		latitude: null, 
		longitude: null, 
		org: null, 
		timezone: null 
	};
	
	// Get IP-based location as fallback
	if (ip) {
		console.log('🔍 Looking up IP geolocation...');
		ipGeo = await ipinfoLookup(ip);
		console.log('📍 IP Geolocation result:', ipGeo);
	} else {
		console.log('⚠️ No IP found, skipping IP geolocation');
	}

	// GPS-based precise location
	let preciseLocation = {
		address: null as string | null,
		city: null as string | null,
		district: null as string | null,
		postal_code: null as string | null,
		country: null as string | null,
	};

	// If user provided GPS coordinates, get precise location
	if (payload.user_latitude && payload.user_longitude) {
		console.log('🎯 Getting precise location from GPS coordinates...');
		const geocoded = await reverseGeocode(payload.user_latitude, payload.user_longitude);
		preciseLocation = {
			address: geocoded.address,
			city: geocoded.city,
			district: geocoded.district,
			postal_code: geocoded.postal_code,
			country: geocoded.country,
		};
		console.log('📍 Precise location result:', preciseLocation);
	}

	// Device info (optional, can be extended)
	const device_type = payload.device_type ?? null;
	const browser = payload.browser ?? null;
	const os = payload.os ?? null;
	const is_bot = payload.is_bot ?? null;
	const locale = payload.locale ?? null;

	console.log('💾 Storing visit data in Postgres...');

	// Store in Postgres with enhanced location data
	try {
		await sql`
			INSERT INTO visit_events
				(ts, path, referer, 
				 ip_city, ip_region, ip_country, ip_postal_code, ip_latitude, ip_longitude, org, timezone,
				 user_latitude, user_longitude, user_accuracy, location_source,
				 precise_address, precise_city, precise_district, precise_postal_code, precise_country,
				 session_id, device_type, browser, os, is_bot, preferred_locale)
			VALUES
				(to_timestamp(${Date.parse(payload.ts)} / 1000.0), ${payload.path}, ${payload.referer ?? null},
				 ${ipGeo.city}, ${ipGeo.region}, ${ipGeo.country}, ${ipGeo.postal_code}, ${ipGeo.latitude}, ${ipGeo.longitude}, ${ipGeo.org}, ${ipGeo.timezone},
				 ${payload.user_latitude ?? null}, ${payload.user_longitude ?? null}, ${payload.user_accuracy ?? null}, ${payload.location_source},
				 ${preciseLocation.address}, ${preciseLocation.city}, ${preciseLocation.district}, ${preciseLocation.postal_code}, ${preciseLocation.country},
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
