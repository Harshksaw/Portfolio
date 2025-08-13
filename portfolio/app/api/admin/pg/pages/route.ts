export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      select path, count(*)::int as visits
      from visit_events
      where expires_at > NOW()
      group by 1
      order by visits desc, path asc
      limit 50;
    `;
    return Response.json(rows);
  } catch (error) {
    console.error('Error fetching page stats:', error);
    return Response.json({ error: 'Failed to fetch page stats' }, { status: 500 });
  }
}
