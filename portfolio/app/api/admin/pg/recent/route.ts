export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      select ts, path, 
             -- Prioritize GPS location over IP location for main display
             CASE 
               WHEN location_source = 'gps' THEN precise_city 
               ELSE ip_city 
             END as city,
             CASE 
               WHEN location_source = 'gps' THEN precise_country 
               ELSE ip_country 
             END as country,
             CASE 
               WHEN location_source = 'gps' THEN precise_postal_code 
               ELSE ip_postal_code 
             END as postal_code,
             -- GPS-specific data
             precise_city,
             precise_country,
             precise_district,
             precise_address,
             precise_postal_code,
             -- IP-specific data  
             ip_city,
             ip_country,
             ip_region,
             ip_postal_code,
             -- Location metadata
             location_source,
             user_accuracy,
             -- Coordinates for mapping
             user_latitude,
             user_longitude,
             ip_latitude,
             ip_longitude,
             -- Device and browser info
             browser, os, device_type, preferred_locale,
             -- Additional metadata
             org, timezone, session_id, is_bot
      from visit_events
      where expires_at > NOW()  -- Only non-expired records
      order by ts desc
      limit 200;
    `;
    return Response.json(rows);
  } catch (error) {
    console.error('Error fetching recent visits:', error);
    return Response.json({ error: 'Failed to fetch recent visits' }, { status: 500 });
  }
}
