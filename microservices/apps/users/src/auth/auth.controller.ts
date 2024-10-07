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
import {AUTH_PATTERNS }from '@app/contracts/users/user.patterns'
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @MessagePattern(AUTH_PATTERNS.REGISTER)
  async register(@Payload() registerDto: createUserDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern(AUTH_PATTERNS.VERIFY_OTP)
  async verifyOtp(
    @Payload() otpDto: otpDto,
    @Headers('Authorization') token: string,
  ) {
    const bearerToken = token.split(' ')[1];
    return this.authService.verifyOtp(otpDto, bearerToken);
  }

  @MessagePattern(AUTH_PATTERNS.LOGIN)
  async login(@Payload() loginDto: loginDto, @Res({ passthrough: true }) res: Response,): Promise<any> {
    return this.authService.login(loginDto,res);
  }

  @MessagePattern(AUTH_PATTERNS.REQUEST_PASSWORD_RESET)
  async requestPasswordReset(@Payload() requestDto: requestDto): Promise<{ message: string }> {
    return this.authService.requestPasswordReset(requestDto);
  }

  @MessagePattern(AUTH_PATTERNS.RESET_PASSWORD)
  async resetPassword(
    @Payload() resetPasswordDto: ResetPasswordDto,
    @Headers('Authorization') token: string
  ): Promise<{ message: string }> {
    const bearerToken = token.split(' ')[1];
    return this.authService.resetPassword(resetPasswordDto, bearerToken);
  }

  @MessagePattern(AUTH_PATTERNS.REFRESH_TOKEN)
  async refreshToken(@Req() req: Request): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(req);
  }

  @MessagePattern(AUTH_PATTERNS.LOGOUT)
  async logout(@Res() res: Response): Promise<{ message: string }> {
   
    return this.authService.logout(res);
  }
}
