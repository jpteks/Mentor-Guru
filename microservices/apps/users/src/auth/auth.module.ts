import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigifyModule } from '@itgorillaz/configify';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from './email/email.service';
import { OtpService } from './otp/otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/User.schema';
import { UserModule } from '../user/user.module';
import { OTPModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { userConfiguration } from '../config/config.configuration';
import { SubscriptionModule } from '../subscription/subscription.module';
@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: 'microservices/.env',
    // }),
    OTPModule,
    EmailModule,
    forwardRef(() => UserModule),
    forwardRef(() => SubscriptionModule),
    //   MongooseModule.forRootAsync({
    //     imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) => ({
    //       uri: configService.get<string>('DB_URL'),
    //     }),
    //     inject: [ConfigService],
    //   }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      global: true,
      inject: [userConfiguration],
      useFactory: (configService: userConfiguration) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.jwtExp,
          algorithm: 'HS256',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, OtpService, JwtAuthGuard],
  exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}
