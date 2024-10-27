import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigifyModule } from '@itgorillaz/configify';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from './email/email.service';
import { OtpService } from './otp/otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { OTPModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { userConfiguration } from '../config/config.configuration';
@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: 'microservices/.env',
    // }),
    OTPModule,
    EmailModule,
    //   MongooseModule.forRootAsync({
    //     imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) => ({
    //       uri: configService.get<string>('DB_URL'),
    //     }),
    //     inject: [ConfigService],
    //   }),
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
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, OtpService, JwtAuthGuard],
  exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}
