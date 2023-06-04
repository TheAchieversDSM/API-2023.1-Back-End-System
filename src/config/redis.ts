import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const redisUrl = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;

export const createClientRedis = createClient({
  url: redisUrl,
});