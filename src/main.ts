import ENV_VARIABLES from '@common/constants/env.const';
import { configureCloudinary } from '@common/utils/cloudinary.util';
import { getEnv } from '@common/utils/env.util';
import { AppModule } from '@modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: getEnv(ENV_VARIABLES.WEBSITE_URL),
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(graphqlUploadExpress());

  configureCloudinary();
  await app.listen(3000);

  console.log(
    `Application is running on: localhost:${getEnv(ENV_VARIABLES.PORT)}`,
  );
}
bootstrap();
