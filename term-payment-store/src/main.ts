import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const {env} = process;


async function sfr() {
  try {
    const app = await NestFactory.create(AppModule);
    
    const config = new DocumentBuilder()
    .setTitle('Term Payment Store')
    .setDescription('Term Payment Store API Documentation')
    .setVersion('1.0.0')
    .addTag('term-payment-store')
    .build();
  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  
    app.use(cookieParser())
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe())
    
  
    
    await app.listen(env.PORT, () => {
      console.log("listening on port " + env.PORT);
    });
  } catch (error) {
    throw new Error('Server error: ' + error)
  }
}
sfr();
