import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { createUserDto } from '../dto/createUser.dto';
import { updateUserDto } from '../dto/updateUser.dto'; // Ensure to import your DTOs
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../decorator/role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { UserRole } from '../schemas/User.schema';

@Controller('user')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT Guard
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // Admin: Create a new user
  @Post('create')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() createUserDto: createUserDto, @Request() request) {
    const userRole = request.user.role;
    if (userRole === UserRole.STUDENT) {
      return {
        message: 'Access denied. You can only view your own information.',
      };
    }
    return this.usersService.create(createUserDto);
  }

  // Admin: Get all users
  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  // Admin/Student: Get user by ID
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string, @Request() request) {
    const userRole = request.user.role;

    // If the user is a student, they can only get their own info
    if (userRole === UserRole.STUDENT && request.user.id !== id) {
      return {
        message: 'Access denied. You can only view your own information.',
      };
    }

    return this.usersService.findOne(id);
  }

  // Admin: Update user by ID
  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: string,
    @Request() request,
    @Body() updateUserDto: updateUserDto,
  ) {
    const userRole = request.user.role;

    // If the user is a student, they can only get their own info
    if (userRole === UserRole.STUDENT && request.user.id !== id) {
      return {
        message: 'Access denied. You can only update your own information.',
      };
    }
    return this.usersService.update(id, updateUserDto);
  }

  // Admin: Delete user by ID
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string, @Request() request) {
    const userRole = request.user.role;

    // If the user is a student, they can only get their own info
    if (userRole === UserRole.STUDENT && request.user.id !== id) {
      return {
        message: 'Access denied. You can only delete your own information.',
      };
    }
    return this.usersService.remove(id);
  }
}
