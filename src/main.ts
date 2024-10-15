import { configureCloudinary } from '@common/utils/cloudinary.util';
import { AppModule } from '@modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(graphqlUploadExpress());

  configureCloudinary();
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
