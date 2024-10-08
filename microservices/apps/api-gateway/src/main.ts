import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { port } from '@app/contracts/port';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(port.API);
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
