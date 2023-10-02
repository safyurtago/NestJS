import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as CookieParser from 'cookie-parser'

const {env} = process;


const sfr = async () => {
  const config = new DocumentBuilder()
  .setTitle('ITicket Booking')
  .setDescription('Project for Booking ITikcet')
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJs, PostgreSQL, JWT, Sequelize, Swagger')
  .build();

  const app = await NestFactory.create(AppModule)

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.use(CookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  

  app.listen(env.PORT, () => {
    console.log("listening on port " + env.PORT);
  })
}

sfr();