import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigifyModule } from '@itgorillaz/configify';
import { port } from '@app/contracts/port';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: port.USERS,
        },
      },
    ]),
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
