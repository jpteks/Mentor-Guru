import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import * as cookieParser from 'cookie-parser';
import { userConfiguration } from './config/config.configuration';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const config = app.get(userConfiguration);
  const port = config.port || 3002;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
