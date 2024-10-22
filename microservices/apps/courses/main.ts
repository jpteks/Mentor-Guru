import { NestFactory } from '@nestjs/core';
import { CoursesModule } from './src/courses/courses.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { port } from '@app/contracts/port';

async function bootstrap() {
  const app = await NestFactory.create(CoursesModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: port.COURSES,
    },
  });

  await app.startAllMicroservices();
  //await app.listen();
}
bootstrap();