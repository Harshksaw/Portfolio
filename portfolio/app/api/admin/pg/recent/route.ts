export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      select ts, path, city, region, country, browser, os, device_type, preferred_locale
      from visit_events
      where ts::date = current_date
      order by ts desc
      limit 200;
    `;
    return Response.json(rows);
  } catch (error) {
    console.error('Error fetching recent visits:', error);
    return Response.json({ error: 'Failed to fetch recent visits' }, { status: 500 });
  }
}
