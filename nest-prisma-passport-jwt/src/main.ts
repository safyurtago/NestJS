import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const {env} = process;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParser());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');


  await app.listen(env.PORT, () => {
    console.log("listening on port " + env.PORT);
  });
}
bootstrap();
