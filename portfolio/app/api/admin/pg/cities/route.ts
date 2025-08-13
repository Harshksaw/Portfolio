export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      select 
        CASE 
          WHEN location_source = 'gps' THEN coalesce(precise_city, 'Unknown GPS City')
          ELSE coalesce(ip_city, 'Unknown IP City') 
        END as city,
        location_source,
        count(*)::int as visits
      from visit_events
      where expires_at > NOW()
      group by 1, 2
      order by visits desc, city asc;
    `;
    return Response.json(rows);
  } catch (error) {
    console.error('Error fetching city stats:', error);
    return Response.json({ error: 'Failed to fetch city stats' }, { status: 500 });
  }
}
