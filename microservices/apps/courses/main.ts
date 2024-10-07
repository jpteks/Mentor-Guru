import { NestFactory } from '@nestjs/core';
import { CoursesModule } from './src/courses/courses.module';

async function bootstrap() {
  const app = await NestFactory.create(CoursesModule);
  await app.listen(3002);
}
bootstrap();