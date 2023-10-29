import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 8000;

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api');

    await app.listen(PORT, () => {
      console.log('Server runing on port: '+PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
start();