import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { createUserDto } from '../dto/createUser.dto';
import { updateUserDto } from '../dto/updateUser.dto'; // Ensure to import your DTOs
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../decorator/role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { UserRole } from '../schemas/User.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response,Request } from 'express';
@Controller('user')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT Guard
export class UserController {
  constructor(private readonly usersService: UserService) {}
 // Admin: Create a new user
 @MessagePattern({ cmd: 'create-user' })
 @Roles(UserRole.ADMIN)
 @UseGuards(RolesGuard)
 async create(@Payload() createUserDto: createUserDto) {
   return this.usersService.create(createUserDto);
 }

 // Admin: Get all users
 @MessagePattern({ cmd: 'find-all-users' })
 @Roles(UserRole.ADMIN)
 @UseGuards(RolesGuard)
 async findAll() {
   return this.usersService.findAll();
 }

 // Admin/Student: Get user by ID
 @MessagePattern({ cmd: 'find-user-by-id' })
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
 @MessagePattern({ cmd: 'update-user' })
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
 @MessagePattern({ cmd: 'remove-user' })
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
