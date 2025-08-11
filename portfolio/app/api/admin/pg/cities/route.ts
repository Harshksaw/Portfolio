export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      select coalesce(city, 'Unknown') as city, count(*)::int as visits
      from visit_events
      where ts::date = current_date
      group by 1
      order by visits desc, city asc;
    `;
    return Response.json(rows);
  } catch (error) {
    console.error('Error fetching city stats:', error);
    return Response.json({ error: 'Failed to fetch city stats' }, { status: 500 });
  }
}
