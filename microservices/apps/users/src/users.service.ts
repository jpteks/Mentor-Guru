import { Injectable } from '@nestjs/common';
import { userConfiguration } from './config/config.configuration';

@Injectable()
export class UsersService {
  constructor(private readonly conf: userConfiguration) {}
  getUsers(): string {
    return 'Hello World! service';
  }
}
