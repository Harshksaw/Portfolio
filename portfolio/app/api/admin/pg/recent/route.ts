export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      select ts, path, 
             -- Prioritize GPS location over IP location
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
             precise_district as district,
             precise_address as address,
             location_source,
             user_accuracy,
             browser, os, device_type, preferred_locale
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
