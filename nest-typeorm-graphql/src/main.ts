import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // .ENV BY ConfigService
  const config = app.get(ConfigService)
  const PORT = config.get<number>('API_PORT');

  // Set Global Prefix for API's
  app.setGlobalPrefix('api');

  await app.listen(PORT, () => {
    console.log("Connecting to API port: " + PORT);
  });
};

bootstrap();