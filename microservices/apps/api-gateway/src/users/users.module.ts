import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { ConfigifyModule } from '@itgorillaz/configify';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../users/src/schemas/User.schema';
import { userConfiguration } from 'apps/users/src/config/config.configuration';
import { UserModule } from './user/user.module';

@Module({
  // imports: [
  //   ConfigifyModule.forRootAsync(),
  //   AuthModule, // Include AuthModule
  //   MongooseModule.forRootAsync({
  //     useFactory: async (userConfig: userConfiguration) => ({
  //       uri: userConfig.userDB,
  //     }),
  //     inject: [userConfiguration],
  //   }),
  //   MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  //   UserModule,
   
  // ],
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
      AuthModule, // Include AuthModule
      MongooseModule.forRootAsync({
        useFactory: async (userConfig: userConfiguration) => ({
          uri: userConfig.userDB,
        }),
        inject: [userConfiguration],
      }),
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      UserModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
