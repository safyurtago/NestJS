import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const {env} = process
    await app.listen(env.PORT, () => { 
      console.log("listening on port " + env.PORT);
    });
  } catch (error) {
    console.log(error);
    
  }
}
bootstrap();
