import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(UsersModule);
  const configService = appContext.get(ConfigService);
  const port = configService.get<number>('GATEWAY_PORT') || 3001;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ApiGatewayModule, {
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });
  await app.listen();
   console.log(`app listening at http://localhost:${port}`)

}
bootstrap();
