import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not set");
}

const redis = new Redis(redisUrl);

export async function GET() {
  const todayKey = `visits:${new Date().toISOString().slice(0, 10)}`;
  const visits = await redis.lrange(todayKey, 0, -1);
  return new Response(JSON.stringify(visits.map((v: string) => JSON.parse(v))), {
    headers: { "Content-Type": "application/json" },
  });
}