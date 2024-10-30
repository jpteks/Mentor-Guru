import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema, User } from '../src/schemas/User.schema';
import { ConfigifyModule } from '@itgorillaz/configify';
import { AuthModule } from './auth/auth.module';
import { userConfiguration } from './config/config.configuration';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: async (userConfig: userConfiguration) => ({
        uri: userConfig.userDB,
      }),
      inject: [userConfiguration],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
