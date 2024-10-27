import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema, User } from '../src/schemas/User.schema';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigifyModule } from '@itgorillaz/configify';
import { AuthModule } from './auth/auth.module';
import { userConfiguration } from './config/config.configuration';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),

    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: 'microservices/.env',
    // }),
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: async (userConfig: userConfiguration) => ({
        uri: userConfig.userDB,
      }),
      inject: [userConfiguration],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,

    //  JwtModule.registerAsync({
    //   inject:[configuration],
    //   global:true,
    //   useFactory:(config:configuration)=>({
    //     secret:config.jwtSecret,
    //     signOptions:{
    //       expiresIn:config.jwtExp
    //     }
    //   })
    //  }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
