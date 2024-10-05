import { Controller, Post, Body, Headers, Get, Req,Res } from '@nestjs/common';
import { createUserDto } from '../dto/createUser.dto';
import { updateUserDto } from '../dto/updateUser.dto'; 
import { AuthService } from './auth.service';
import { otpDto } from '../dto/otp.dto';
import { loginDto } from '../dto/login.dto';
import { requestDto } from '../dto/request.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response,Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(@Payload() registerDto: createUserDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern({ cmd: 'verify-otp' })
  async verifyOtp(
    @Payload() otpDto: otpDto,
    @Headers('Authorization') token: string,
  ) {
    const bearerToken = token.split(' ')[1];
    return this.authService.verifyOtp(otpDto, bearerToken);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() loginDto: loginDto, @Res({ passthrough: true }) res: Response,): Promise<any> {
    return this.authService.login(loginDto,res);
  }

  @MessagePattern({ cmd: 'request-password-reset' })
  async requestPasswordReset(@Payload() requestDto: requestDto): Promise<{ message: string }> {
    return this.authService.requestPasswordReset(requestDto);
  }

  @MessagePattern({ cmd: 'reset-password' })
  async resetPassword(
    @Payload() resetPasswordDto: ResetPasswordDto,
    @Headers('Authorization') token: string
  ): Promise<{ message: string }> {
    const bearerToken = token.split(' ')[1];
    return this.authService.resetPassword(resetPasswordDto, bearerToken);
  }

  @MessagePattern({ cmd: 'refresh-token' })
  async refreshToken(@Req() req: Request): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(req);
  }

  @MessagePattern({ cmd: 'logout' })
  async logout(@Res() res: Response): Promise<{ message: string }> {
   
    return this.authService.logout(res);
  }
}
