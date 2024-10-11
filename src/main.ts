import { AppModule } from '@modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
