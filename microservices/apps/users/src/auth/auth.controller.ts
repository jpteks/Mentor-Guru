import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Res,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { createUserDto } from '../dto/createUser.dto';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { otpDto } from '../dto/otp.dto';
import { loginDto } from '../dto/login.dto';
import { requestDto } from '../dto/request.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: createUserDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  async verifyOtp(
    @Body() otpDto: otpDto,
    @Headers('Authorization') token: string,
  ) {
    const bearerToken = token.split(' ')[1];

    return this.authService.verifyOtp(otpDto, bearerToken);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: loginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.authService.login(loginDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('request-password-reset')
  async requestPasswordReset(
    @Body() requestDto: requestDto,
  ): Promise<{ message: string }> {
    return this.authService.requestPasswordReset(requestDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Headers('Authorization') token: string,
  ): Promise<{ message: string }> {
    const bearerToken = token.split(' ')[1];
    return this.authService.resetPassword(resetPasswordDto, bearerToken);
  }
  @HttpCode(HttpStatus.OK)
  @Get('refresh-token')
  async refreshToken(@Req() req: Request): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(req);
  }
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res() res: Response): Promise<{ message: string }> {
    return this.authService.logout(res);
  }
}
