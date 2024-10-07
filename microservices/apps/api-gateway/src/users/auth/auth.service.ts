import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../../../users/src/schemas/User.schema';
import { OtpService } from './otp/otp.service';
import { EmailService } from './email/email.service';
import { createUserDto } from '@app/contracts/users/createUser.dto';
import { otpDto } from '@app/contracts/users/otp.dto';
import { loginDto } from '@app/contracts/users/login.dto';
import { requestDto } from '@app/contracts/users/request.dto';
import { ResetPasswordDto } from '@app/contracts/users/resetPassword.dto';
import { Response, Request } from 'express';

import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AUTH_PATTERNS } from '@app/contracts/users/user.patterns'; // Import the AUTH_PATTERNS constants

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
    @Inject('USER_SERVICE') private readonly client: ClientProxy, // Injecting ClientProxy for microservices
  ) {}

  async register(createUserDto: createUserDto) {
    try {
      return this.client.send({cmd:AUTH_PATTERNS.REGISTER},createUserDto)
      // const { username, email, phoneNumber, region, password, role } = createUserDto;

      // // Check if email already exists
      // const user = await this.userModel.findOne({ email });
      // if (user) {
      //   return {
      //     statusCode: HttpStatus.BAD_REQUEST,
      //     message: 'user already exists',
      //     token: null,
      //   };
      // }

      // // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);
      // const otp = this.otpService.generateOtp();
      // const otpExpiry = new Date(Date.now() + 1 * 60000); // OTP valid for 1 minute

      // // Create new user
      // const newUser = new this.userModel({
      //   username,
      //   email,
      //   phoneNumber,
      //   region,
      //   password: hashedPassword,
      //   otp,
      //   otpExpiry,
      //   role,
      // });
      // console.log(newUser)

      // // Save new user to the database
      // await newUser.save();
    

      // // Send OTP via email
      // await this.emailService.sendOtpEmail(newUser.username, newUser.email, otp);

      // const token = this.jwtService.sign({ id: newUser._id });

      // // Send request to notify that a new user has registered
      // this.client.send(AUTH_PATTERNS.REGISTER, newUser)

      // return {
      //   statusCode: HttpStatus.CREATED,
      //   message: 'OTP sent through your email, expires in 1 minute.',
      //   token,
      // };
    } catch (e) {
      console.error('Error during registration:', e);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server error',
        token: null,
      };
    }
  }

  async verifyOtp(otpDto: otpDto, token: string): Promise<{ statusCode: number; message: string }> {
    const { otp } = otpDto;
    const decodedToken = this.jwtService.verify(token);
    const userId = decodedToken.id;

    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
      }

      if (user.isEmailVerified) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User already verified',
        };
      }

      if (user.otp !== otp) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid OTP',
        };
      }

      if (user.otpExpiry < new Date()) {
        const newOtp = this.otpService.generateOtp();
        const newOtpExpiry = new Date(Date.now() + 1 * 60000);

        user.otp = newOtp;
        user.otpExpiry = newOtpExpiry;
        await user.save();

        await this.emailService.sendOtpEmail(user.username, user.email, newOtp);

        return {
          statusCode: HttpStatus.OK,
          message: 'OTP expired. A new OTP has been sent to your email.',
        };
      }

      user.isEmailVerified = true;
      user.accountStatus = 'active';
      user.otp = null;
      user.otpExpiry = null;
      await user.save();

      // Send request to notify user verification
      this.client.send(AUTH_PATTERNS.VERIFY_OTP, user);

      return {
        statusCode: HttpStatus.OK,
        message: 'OTP verified. User account is now active.',
      };
    } catch (error) {
      console.error('Error during OTP verification:', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(Login: loginDto, res: Response): Promise<{ token: string, statusCode: number; message: string }> {
    const { email, password } = Login;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      return {
        message: 'Invalid user',
        statusCode: HttpStatus.BAD_REQUEST,
        token: null,
      };
    }

    if (user.accountStatus === 'inactive' || user.isEmailVerified === false) {
      return {
        message: 'Please verify your email',
        statusCode: HttpStatus.CONFLICT,
        token: null,
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        message: 'Invalid password',
        statusCode: HttpStatus.BAD_REQUEST,
        token: null,
      };
    }

    const accessToken = this.jwtService.sign({ id: user._id, role: user.role }, { expiresIn: process.env.EXPIRE });
    const refreshToken = this.jwtService.sign({ id: user._id, role: user.role }, { expiresIn: process.env.EXPIRES });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });

    // Send request to notify successful login
    this.client.send(AUTH_PATTERNS.LOGIN, user)

    return {
      message: `${user.username}, you have successfully logged in`,
      token: accessToken,
      statusCode: HttpStatus.OK,
    };
  }

  async requestPasswordReset(requestDto: requestDto): Promise<{ message: string, token: string }> {
    const { email } = requestDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const resetToken = this.jwtService.sign({ id: user._id }, { expiresIn: '1h' });
    const resetLink = `http://your-app.com/reset-password?token=${resetToken}`;

    await this.emailService.sendPasswordResetEmail(email, resetLink);

    // Send request to notify password reset request
    await this.client.send(AUTH_PATTERNS.REQUEST_PASSWORD_RESET, { email, resetLink }).toPromise();

    return { message: 'Password reset link has been sent to your email, expires in 1 hour.', token: resetToken };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, token: string): Promise<{ message: string }> {
    const { password } = resetPasswordDto;

    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userModel.findById(decoded.id);

      if (!user) {
        throw new HttpException('Invalid token or user not found', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();

      // Send request to notify password reset
      this.client.send(AUTH_PATTERNS.RESET_PASSWORD, user)

      return { message: 'Password successfully reset.' };
    } catch (error) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }
  }

  async refreshToken(req: Request): Promise<{ accessToken: string }> {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new HttpException('No refresh token found', HttpStatus.NO_CONTENT);
    }

    try {
      const decoded = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign({ id: decoded.id, role: decoded.role });

      // Send request to notify refresh token
      this.client.send(AUTH_PATTERNS.REFRESH_TOKEN, { id: decoded.id })

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new HttpException('Invalid or expired refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(res: Response): Promise<{ message: string }> {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });

    // Send request to notify logout
    this.client.send(AUTH_PATTERNS.LOGOUT, {})

    return { message: 'You have successfully logged out' };
  }
}


// import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { User } from '../../../../users/src/schemas/User.schema';
// import { OtpService } from './otp/otp.service';
// import { EmailService } from './email/email.service';
// import { createUserDto } from '@app/contracts/users/createUser.dto';
// import { otpDto } from '@app/contracts/users/otp.dto';
// import { loginDto } from '@app/contracts/users/login.dto';
// import { requestDto } from '@app/contracts/users/request.dto';
// import { ResetPasswordDto } from '@app/contracts/users/resetPassword.dto';
// import { Response, Request } from 'express';


// import { ClientProxy } from '@nestjs/microservices';
// import { Inject } from '@nestjs/common';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name) private readonly userModel: Model<User>,
//     private readonly jwtService: JwtService,
//     private readonly otpService: OtpService,
//     private readonly emailService: EmailService,
//     @Inject('USER_SERVICE') private readonly client: ClientProxy, // Injecting ClientProxy for microservices
//   ) {}

//   async register(createUserDto: createUserDto): Promise<{ statusCode: number; message: string, token: string }> {
//     try {
//       const { username, email, phoneNumber, region, password, role } = createUserDto;

//       // Check if email already exists
//       const user = await this.userModel.findOne({ email });
//       if (user) return {
//         statusCode: HttpStatus.BAD_REQUEST,
//         message: 'user already exists',
//         token: null,
//       };

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const otp = this.otpService.generateOtp();
//       const otpExpiry = new Date(Date.now() + 1 * 60000); // OTP valid for 1 minute

//       // Create new user
//       const newUser = new this.userModel({
//         username,
//         email,
//         phoneNumber,
//         region,
//         password: hashedPassword,
//         otp,
//         otpExpiry,
//         role,
//       });

//       // Save new user to the database
//       await newUser.save();

//       // Send OTP via email
//       await this.emailService.sendOtpEmail(newUser.username, newUser.email, otp);

//       const token = this.jwtService.sign({ id: newUser._id });

//       // Emit an event to notify that a new user has registered
//       this.client.emit('user_registered', newUser); // Emitting the user registration event

//       return {
//         statusCode: HttpStatus.CREATED,
//         message: 'OTP sent through your email, expires in 1 minute.',
//         token,
//       };
//     } catch (e) {
//       // Log error for debugging
//       console.error('Error during registration:', e);

//       return {
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: 'Server error',
//         token: null,
//       };
//     }
//   }

//   async verifyOtp(otpDto: otpDto, token: string): Promise<{ statusCode: number; message: string }> {
//     const { otp } = otpDto;
//     const decodedToken = this.jwtService.verify(token);
//     const userId = decodedToken.id;

//     try {
//       const user = await this.userModel.findById(userId);

//       if (!user) {
//         return {
//           statusCode: HttpStatus.NOT_FOUND,
//           message: 'User not found',
//         };
//       }

//       if (user.isEmailVerified) {
//         return {
//           statusCode: HttpStatus.BAD_REQUEST,
//           message: 'User already verified',
//         };
//       }

//       if (user.otp !== otp) {
//         return {
//           statusCode: HttpStatus.BAD_REQUEST,
//           message: 'Invalid OTP',
//         };
//       }

//       if (user.otpExpiry < new Date()) {
//         const newOtp = this.otpService.generateOtp();
//         const newOtpExpiry = new Date(Date.now() + 1 * 60000);

//         user.otp = newOtp;
//         user.otpExpiry = newOtpExpiry;
//         await user.save();

//         await this.emailService.sendOtpEmail(user.username, user.email, newOtp);

//         return {
//           statusCode: HttpStatus.OK,
//           message: 'OTP expired. A new OTP has been sent to your email.',
//         };
//       }

//       user.isEmailVerified = true;
//       user.accountStatus = 'active';
//       user.otp = null;
//       user.otpExpiry = null;
//       await user.save();

//       this.client.emit('user_verified', user); // Emit event for user verification

//       return {
//         statusCode: HttpStatus.OK,
//         message: 'OTP verified. User account is now active.',
//       };
//     } catch (error) {
//       console.error('Error during OTP verification:', error);
//       throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async login(Login: loginDto, res: Response): Promise<{ token: string, statusCode: number; message: string }> {
//     const { email, password } = Login;

//     const user = await this.userModel.findOne({ email });
//     if (!user) {
//       return {
//         message: 'Invalid user',
//         statusCode: HttpStatus.BAD_REQUEST,
//         token: null,
//       };
//     }

//     if (user.accountStatus === 'inactive' || user.isEmailVerified === false) {
//       return {
//         message: 'Please verify your email',
//         statusCode: HttpStatus.CONFLICT,
//         token: null,
//       };
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return {
//         message: 'Invalid password',
//         statusCode: HttpStatus.BAD_REQUEST,
//         token: null,
//       };
//     }

//     const accessToken = this.jwtService.sign({ id: user._id, role: user.role }, { expiresIn: process.env.EXPIRE });
//     const refreshToken = this.jwtService.sign({ id: user._id, role: user.role }, { expiresIn: process.env.EXPIRES });

//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: 'none',
//     });

//     // Emit event for successful login
//     this.client.emit('user_logged_in', user);

//     return {
//       message: `${user.username}, you have successfully logged in`,
//       token: accessToken,
//       statusCode: HttpStatus.OK,
//     };
//   }

//   async requestPasswordReset(requestDto: requestDto): Promise<{ message: string, token: string }> {
//     const { email } = requestDto;
//     const user = await this.userModel.findOne({ email });

//     if (!user) {
//       throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
//     }

//     const resetToken = this.jwtService.sign({ id: user._id }, { expiresIn: '1h' });
//     const resetLink = `http://your-app.com/reset-password?token=${resetToken}`;

//     await this.emailService.sendPasswordResetEmail(email, resetLink);

//     this.client.emit('password_reset_requested', { email, resetLink }); // Emitting reset request event

//     return { message: 'Password reset link has been sent to your email, expires in 1 hour.', token: resetToken };
//   }

//   async resetPassword(resetPasswordDto: ResetPasswordDto, token: string): Promise<{ message: string }> {
//     const { password } = resetPasswordDto;

//     try {
//       const decoded = this.jwtService.verify(token);
//       const user = await this.userModel.findById(decoded.id);

//       if (!user) {
//         throw new HttpException('Invalid token or user not found', HttpStatus.BAD_REQUEST);
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       user.password = hashedPassword;
//       await user.save();

//       this.client.emit('password_reset', user); // Emit password reset event

//       return { message: 'Password successfully reset.' };
//     } catch (error) {
//       throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
//     }
//   }

//   async refreshToken(req: Request): Promise<{ accessToken: string }> {
//     const refreshToken = req.cookies['refreshToken'];

//     if (!refreshToken) {
//       throw new HttpException('No refresh token found', HttpStatus.NO_CONTENT);
//     }

//     try {
//       const decoded = this.jwtService.verify(refreshToken);
//       const newAccessToken = this.jwtService.sign({ id: decoded.id, role: decoded.role });

//       return { accessToken: newAccessToken };
//     } catch (error) {
//       throw new HttpException('Invalid or expired refresh token', HttpStatus.UNAUTHORIZED);
//     }
//   }

//   async logout(res: Response): Promise<{ message: string }> {
//     res.clearCookie('refreshToken', {
//       httpOnly: true,
//       secure: false,
//       sameSite: 'none',
//     });

//     return { message: 'Logged out successfully' };
//   }
// }
