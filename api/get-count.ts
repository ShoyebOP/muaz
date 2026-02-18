import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const BASE_COUNT = 191;

export default async function handler(
  _request: VercelRequest,
  response: VercelResponse
) {
  try {
    const count = await redis.get<number>('global_order_count') || 0;
    return response.status(200).json({ count: BASE_COUNT + count });
  } catch (error) {
    console.error('Error fetching count:', error);
    // Fallback to base count if DB fails
    return response.status(200).json({ count: BASE_COUNT });
  }
}
