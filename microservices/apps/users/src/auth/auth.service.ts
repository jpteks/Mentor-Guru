import {  HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/User.schema';
import { OtpService } from './otp/otp.service';
import { EmailService } from './email/email.service';
import { createUserDto } from '../dto/createUser.dto' ;
import { Response,Request } from 'express';
import { updateUserDto } from '../dto/updateUser.dto';
import { otpDto } from '../dto/otp.dto';
import { loginDto } from '../dto/login.dto';
import { requestDto } from '../dto/request.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
  ) {}

  async register(createUserDto: createUserDto): Promise<{ statusCode: number; message: string,token:string }> {
    try {
      const { username, email, phoneNumber, region, password,role } = createUserDto;
  
      // Check if email already exists
      const user = await this.userModel.findOne({ email });
      if (user) return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'user exist already',
        token:null
      };
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = this.otpService.generateOtp();
      const otpExpiry = new Date(Date.now() + 1 * 60000); // OTP valid for 10 minutes
  
      // Create new user
      const newUser = new this.userModel({
        username,
        email,
        phoneNumber,
        region,
        password: hashedPassword,
        otp,
        otpExpiry,
       
        role
        
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Send OTP via email
      await this.emailService.sendOtpEmail(newUser.username, newUser.email, otp);
      const token = this.jwtService.sign({ id: newUser._id });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'OTP sent through your mail expires in 1mins.',
        token
      };
    } catch (e) {
      // Log error for debugging
      console.error('Error during registration:', e);
  
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server crashed',
        token:null
      };
    }
  
  }
  async verifyOtp(otpDto: otpDto,token:string): Promise<{ statusCode: number; message: string }> {
    const { otp } = otpDto;
    const decodedToken=this.jwtService.verify(token)
    const userId=decodedToken.id;
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'user not found',
        };
      }

      if (user.isEmailVerified) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'user already verified',
        };
      }
      if( user.otp != otp){
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'invalid otp',
        };

      }
  
      // Check if OTP is expired
      if (user.otpExpiry < new Date()  ) {
        // Generate new OTP
        const newOtp = this.otpService.generateOtp();
        const newOtpExpiry = new Date(Date.now() + 1 * 60000); // OTP valid for 10 minutes

        // Update the user's OTP and expiry
        user.otp = newOtp;
        user.otpExpiry = newOtpExpiry;

        // Save the updated OTP and expiry
        await user.save();

        // Send new OTP email
        await this.emailService.sendOtpEmail(user.username, user.email, newOtp);

        return {
          statusCode: HttpStatus.OK,
          message: 'OTP has expired. A new OTP has been sent to your email.',
        };
      }

      // Validate the OTP
    

      // If OTP is valid, activate the user
      user.accountStatus = 'active';
      user.isEmailVerified = true;
      user.otp = null;
      user.otpExpiry = null;

      await user.save();

      return {
        statusCode: HttpStatus.OK,
        message: 'OTP verified. User account is now active.',
      }}catch (error) {
      console.error('Error during OTP verification:', error); // Log error for debugging
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
  
  }
  


  async login(Login: loginDto, res: Response): Promise<{ token: string,statusCode: number; message: string }> {
    const { email, password } = Login;

    // Check if email exists
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return {
        message:'invalid user',
        statusCode: HttpStatus.BAD_REQUEST,
        token:null
      }
    }
    if(user.accountStatus==='inactive'|| user.isEmailVerified===false){
      return {
        message:'please verify your email',
        statusCode: HttpStatus.CONFLICT,
        token:null
      }
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        message:'invalid password',
        statusCode: HttpStatus.BAD_REQUEST,
        token:null
      }
    }

    // Generate access token
    const accessToken = this.jwtService.sign({ id: user._id ,role:user.role}, { expiresIn: process.env.EXPIRE });

    // Generate refresh token
    const refreshToken = this.jwtService.sign({ id: user._id,role:user.role }, { expiresIn: process.env.EXPIRES }); // Adjust expiration as needed

    // Store refresh token in a cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      secure: false, // Use secure flag in production
      sameSite: 'none', // Helps protect against CSRF attacks strict
    });

    return {
      message:`${user.username} you are successfully login`,
      token: accessToken,
      statusCode: HttpStatus.OK
    };}
    async requestPasswordReset(requestDto: requestDto): Promise<{ message: string,token:string }> {
      const {email}=requestDto
      const user = await this.userModel.findOne({email});
  
      if (!user) {
        throw new HttpException('Email not found',HttpStatus.NOT_FOUND);
      }
  
      // Generate reset token (valid for 1 hour)
      const resetToken = this.jwtService.sign({ id: user._id }, { expiresIn: '1h' });
      const resetLink = `http://your-app.com/reset-password?token=${resetToken}`;
  
      // Send email using EmailService
      await this.emailService.sendPasswordResetEmail(email, resetLink);
  
      return { message:'Password reset link has been sent to your email,expires in 1hr',token:resetToken  };
    }
  
    // Reset Password
    async resetPassword(resetPasswordDto: ResetPasswordDto,token:string): Promise<{ message: string }> {
      const { password } = resetPasswordDto;
  
      try {
        // Verify token
        const decoded = this.jwtService.verify(token);
        const user = await this.userModel.findById(decoded.id);
  
        if (!user) {
          throw new HttpException('Invalid token or user not found', HttpStatus.BAD_REQUEST);
        }
  
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Update the user's password
        user.password = hashedPassword;
        await user.save();
  
        return { message: 'Password successfully reset.' };
      } catch (error) {
        throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
      }
    }
    async refreshToken(req: Request): Promise<{ accessToken: string }> {
      const refreshToken = req.cookies['refreshToken']; 
  
      if (!refreshToken) {
        throw new HttpException('No refresh token found',HttpStatus.NO_CONTENT);
      }
  
      try {
        const decoded = this.jwtService.verify(refreshToken);
        const newAccessToken = this.jwtService.sign({ id: decoded.id,role:decoded.role });
  
        return { accessToken: newAccessToken };
      } catch (error) {
        throw new HttpException('Invalid or expired refresh token',HttpStatus.UNAUTHORIZED);
      }
    }
    async logout(res: Response): Promise<{ message: string }> {
      // Clear the refresh token cookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // Secure flag for production
        sameSite: 'none',
      });
  
      return { message: 'Logged out successfully' };
    }
  
    }
  

  
  

