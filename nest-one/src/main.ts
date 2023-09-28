import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule)
    const port = process.env.PORT || 8090;

    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();