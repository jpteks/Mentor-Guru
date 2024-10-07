import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigifyModule } from '@itgorillaz/configify';
import {ConfigModule,ConfigService} from '@nestjs/config'
import { AuthController } from './auth.controller';
import { AuthService} from './auth.service';
import  { EmailService } from './email/email.service';
import { OtpService } from './otp/otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../../users/src/schemas/User.schema';
import { OTPModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';
import { JwtAuthGuard } from '../../../../users/src/guards/jwt.guard';
import { userConfiguration } from '../../../../users/src/config/config.configuration'
import { UserModule } from '../user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

// auth.module.ts
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
    ConfigifyModule.forRootAsync(),
    OTPModule,
    EmailModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      global: true,
      inject: [userConfiguration],
      useFactory: (configService: userConfiguration) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.jwtExp,
        },
      }),
    }),
    UserModule, // Import the module that provides USER_SERVICE
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, OtpService, JwtAuthGuard],
  exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}
