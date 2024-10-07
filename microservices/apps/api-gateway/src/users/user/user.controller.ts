import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { createUserDto } from '@app/contracts/users/createUser.dto';
import { updateUserDto } from '@app/contracts/users/updateUser.dto'; // Ensure to import your DTOs
import { JwtAuthGuard } from '../../../../users/src/guards/jwt.guard';
import { Roles } from '../../../../users/src/decorator/role.decorator';
import { RolesGuard } from '../../../../users/src/guards/role.guard';
import { UserRole } from '../../../../users/src/schemas/User.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response,Request } from 'express';
import { USER_PATTERNS } from '@app/contracts/users/user.patterns';
@Controller('user')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT Guard
export class UserController {
  constructor(private readonly usersService: UserService) {}
 // Admin: Create a new user
 @MessagePattern(USER_PATTERNS.CREATE)
 @Roles(UserRole.ADMIN)
 @UseGuards(RolesGuard)
 async create(@Payload() createUserDto: createUserDto) {
   return this.usersService.create(createUserDto);
 }

 // Admin: Get all users
 @MessagePattern(USER_PATTERNS.FIND_ALL)
 @Roles(UserRole.ADMIN)
 @UseGuards(RolesGuard)
 async findAll() {
   return this.usersService.findAll();
 }

 // Admin/Student: Get user by ID
 @MessagePattern(USER_PATTERNS.FIND_ONE)
 @Roles(UserRole.ADMIN, UserRole.STUDENT)
 @UseGuards(RolesGuard)
 async findOne(@Payload() payload: { id: string; userId: string; userRole: UserRole }) {
  const { id, userId, userRole } = payload;

  // If the user is a student, they can only get their own info
  if (userRole === UserRole.STUDENT && userId !== id) {
    return { message: "Access denied. You can only view your own information." };
  }

  return this.usersService.findOne(id);
}


 // Admin: Update user by ID
 @MessagePattern(USER_PATTERNS.UPDATE)
 @Roles(UserRole.ADMIN, UserRole.STUDENT)
 @UseGuards(RolesGuard)
 async update(@Payload() payload: { id: string; updateUserDto: updateUserDto; userId: string; userRole: UserRole }) {
  const { id, updateUserDto, userId, userRole } = payload;

  // If the user is a student, they can only update their own info
  if (userRole === UserRole.STUDENT && userId !== id) {
    return { message: "Access denied. You can only update your own information." };
  }

  return this.usersService.update(id, updateUserDto);
}

 // Admin: Delete user by ID
 @MessagePattern(USER_PATTERNS.DELETE)
 @Roles(UserRole.ADMIN, UserRole.STUDENT)
 @UseGuards(RolesGuard)
 async remove(@Payload() payload: { id: string; userId: string; userRole: UserRole }) {
  const { id, userId, userRole } = payload;

  // If the user is a student, they can only delete their own info
  if (userRole === UserRole.STUDENT && userId !== id) {
    return { message: "Access denied. You can only delete your own information." };
  }

  return this.usersService.remove(id);
}
}
