import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../user/user.controller';
import { User, UserSchema } from '../../../../users/src/schemas/User.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../../../../users/src/guards/role.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}