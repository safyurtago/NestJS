import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  
  const config = new DocumentBuilder()
    .setTitle('User-role Project')
    .setDescription('REST API')
    .setVersion('1.0.0')
    .addTag('NestJS, Postgress, Sequelize')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/api`);
  });
}
bootstrap();