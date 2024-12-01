import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/User.schema';
import { createUserDto } from '../dto/createUser.dto';
import { updateUserDto } from '../dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { Subscription } from '../schemas/Subscription.schema';
import { Payment } from '../schemas/Payment.schema';
import { Plan } from '../schemas/Plan.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Subscription') private subscriptionModel: Model<Subscription>,
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
    @InjectModel('Plan') private readonly planModel: Model<Plan>,
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
      const freePlan = await this.planModel.findOne({ packageName: 'Free' });
      if (!freePlan)
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Plan not found',
          token: null,
        };
      // Create new user
      const newUser = new this.userModel({
        username,
        email,
        phoneNumber,
        region,
        plan: freePlan._id,
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
        role,
        isEmailVerified: true,
        accountStatus: 'active',
        subscription: null,
        subscriptionDate: new Date().toLocaleDateString('en-CA'),
        subscriptionExpiresAt: null,
      });

      // Save the new user to the database
      await newUser.save();

      const subscription = new this.subscriptionModel({
        user: user._id,
        plan: freePlan._id,
        payment: null,
        subscriptionDate: new Date().toLocaleDateString('en-CA'),
        expirationDate: null,
      });
      await subscription.save();
      const payment = new this.paymentModel({
        user: user._id,
        subscription: subscription._id,
        amount: 0,
        status: 'completed',
        paymentMethod: 'cash',
        paymentDate: new Date().toISOString().split('T')[0],
      });

      await payment.save();
      await this.subscriptionModel.updateOne(
        { _id: subscription._id },
        { $set: { payment: payment._id } },
      );
      await subscription.save();
      // Update user with the subscription ID
      await this.userModel.updateOne(
        { _id: newUser._id },
        { $set: { subscription: subscription._id } },
      );

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

  async findAll() {
    const totalUsers = await this.userModel.countDocuments().exec();
    const users = await this.userModel
      .find()
      .populate('plan', 'packageName')
      .exec();
    return {
      users,
      totalUsers,
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate('plan', 'packageName')
      .exec();
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
    // const subscription=await this.subscriptionModel.findOne({ user: id }).exec();
    // subscription.plan=null;
    // subscription.payment=null;
    // subscription.subscriptionDate=null;
    // subscription.expirationDate=null;

    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      return { message: 'user not found', statusCode: HttpStatus.NOT_FOUND };
    }

    return { message: 'user deleted successfully', statusCode: HttpStatus.OK };
  }
}
