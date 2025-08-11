import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export async function GET() {
  const todayKey = `visits:${new Date().toISOString().slice(0, 10)}`;
  const visits = await redis.lrange(todayKey, 0, -1);
  return Response.json(visits.map((v: string) => JSON.parse(v)));
}