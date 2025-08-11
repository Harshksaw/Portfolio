import { kv } from "@vercel/kv";

export async function GET() {
  const todayKey = `visits:${new Date().toISOString().slice(0, 10)}`;
  const visits = await kv.lrange(todayKey, 0, -1);
  return Response.json(visits.map((v: string) => JSON.parse(v)));
}
