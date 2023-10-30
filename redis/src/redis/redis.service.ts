import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';
import { SetRediDto } from './dto/set-redis.dto';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public constructor (
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
  ) {}


  onModuleDestroy() {
    this.redisClient.quit();
  }

  ping() {
    return this.redisClient.ping();
  }


  async set(setRedisDto: SetRediDto): Promise<string> {
    const {key, value} = setRedisDto;
    await this.redisClient.set(key, value, {EX: 10});
  
    return 'Set value: ' + value;
  }

  async get(otp: string): Promise<string> {
    const retrievedValue = await this.redisClient.get(otp);
  
    return 'Retrieved value: ' + retrievedValue;
  }
}
