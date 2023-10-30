import { FactoryProvider } from "@nestjs/common";
import { REDIS_CLIENT, RedisClient } from "./redis-client.type";
import { createClient } from "redis";

export const redisClientFactory: FactoryProvider<Promise<RedisClient>> = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    // const client = createClient({ url: 'redis://redis:6379/0' }); // for docker
    const client = createClient({ url: 'redis://default:cuCY00j0pPQCP3DwDEODYxFlHyM2Wprk@redis-12555.c293.eu-central-1-1.ec2.cloud.redislabs.com:12555' }); // for redis cloud
    await client.connect();
    return client;
  },
};