import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { port } from '@app/contracts/port';
import { UsersModule } from './users.module';
async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: port.USERS,
    },
  });

  await app.startAllMicroservices();
  //await app.listen();
}
bootstrap();