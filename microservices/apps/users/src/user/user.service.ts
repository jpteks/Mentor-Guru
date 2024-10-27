import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/User.schema'; // Import your User model
import { createUserDto } from '../dto/createUser.dto';
import { updateUserDto } from '../dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(
    createUserDto: createUserDto,
  ): Promise<{ statusCode: number; message: string; token: string }> {
    try {
      const { username, email, phoneNumber, region, password, role } =
        createUserDto;

      // Check if email already exists
      const user = await this.userModel.findOne({ email });
      if (user)
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'user exist already',
          token: null,
        };

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new this.userModel({
        username,
        email,
        phoneNumber,
        region,
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
        role,
        isEmailVerified: true,
        accountStatus:'active' ,
      });

      // Save the new user to the database
      await newUser.save();

      return {
        statusCode: HttpStatus.CREATED,
        message: 'user created',
        token: null,
      };
    } catch (e) {
      // Log error for debugging
      console.error('Error during creation of user:', e);

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server crashed',
        token: null,
      };
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: updateUserDto,
  ): Promise<{ message: string; statusCode: number }> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return { message: 'User not found', statusCode: HttpStatus.NOT_FOUND };
    }

    // Only hash the password if it exists in the DTO
    if (updateUserDto.password) {
      const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
      user.password = hashPassword;
    }

    // Update other fields
    user.region = updateUserDto.region;
    user.username = updateUserDto.username;
    user.phoneNumber = updateUserDto.phoneNumber;

    await user.save();
    return { message: 'User updated successfully', statusCode: HttpStatus.OK };
  }

  async remove(id: string): Promise<{ message: string; statusCode: number }> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      return { message: 'user not found', statusCode: HttpStatus.NOT_FOUND };
    }
    return { message: 'user deleted successfully', statusCode: HttpStatus.OK };
  }
}
