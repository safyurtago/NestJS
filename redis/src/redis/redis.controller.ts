import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RedisService } from './redis.service';
import { SetRediDto } from './dto/set-redis.dto';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('ping')
  ping () {
    return this.redisService.ping();
  }

  @Post('set')
  set(
    @Body() setRediDto: SetRediDto
  ) {
    return this.redisService.set(setRediDto);
  }

  @Post('get/:otp')
  get(
    @Param('otp') otp: string,
  ) {
    return this.redisService.get(otp)
  }
}
