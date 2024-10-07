import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_PATTERNS } from '@app/contracts/users/users.pattern';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private userClient: ClientProxy) {}

  create(createUserDto: CreateUserDto) {
    return this.userClient.send(USERS_PATTERNS.CREATE, createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
