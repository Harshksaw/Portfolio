import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not set");
}

const redis = new Redis(redisUrl);

export async function GET() {
  const todayKey = `visits:${new Date().toISOString().slice(0, 10)}`;
  console.log('📊 Admin: Fetching visits for key:', todayKey);
  
  try {
    const visits = await redis.lrange(todayKey, 0, -1);
    console.log('📊 Admin: Found', visits.length, 'visits');
    
    const parsedVisits = visits.map((v: string) => JSON.parse(v));
    console.log('📊 Admin: Returning parsed visits');
    
    return new Response(JSON.stringify(parsedVisits), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('❌ Admin: Error fetching visits:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch visits' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}