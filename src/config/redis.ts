import { createClient } from "redis";

const redisUrl = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}`;

export const createClientRedis = createClient({
  url: redisUrl,
});

/* export const ConnectRedis = async () => {
  await createClientRedis
    .connect()
    .then(() => console.log("Redis conectado com sucesso"))
    .catch((err) => console.log(err));
};
 */