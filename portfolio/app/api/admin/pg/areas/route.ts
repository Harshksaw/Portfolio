export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      select 
        coalesce(precise_address, 'Unknown Address') as address,
        coalesce(precise_district, 'Unknown District') as district,
        CASE 
          WHEN location_source = 'gps' THEN coalesce(precise_postal_code, 'Unknown GPS Postal') 
          ELSE coalesce(ip_postal_code, 'Unknown IP Postal')
        END as postal_code,
        CASE 
          WHEN location_source = 'gps' THEN coalesce(precise_city, 'Unknown GPS City')
          ELSE coalesce(ip_city, 'Unknown IP City') 
        END as city,
        location_source,
        avg(user_accuracy)::int as avg_accuracy,
        count(*)::int as visits
      from visit_events
      where expires_at > NOW()
      group by precise_address, precise_district, 
               CASE WHEN location_source = 'gps' THEN precise_postal_code ELSE ip_postal_code END,
               CASE WHEN location_source = 'gps' THEN precise_city ELSE ip_city END,
               location_source
      order by visits desc, address asc
      limit 50;
    `;
    return Response.json(rows);
  } catch (error) {
    console.error('Error fetching area stats:', error);
    return Response.json({ error: 'Failed to fetch area stats' }, { status: 500 });
  }
}
