import { Controller, Post, Body, Get, Headers, Req, Res,ValidationPipe,  UsePipes,InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from '@app/contracts/users/createUser.dto';
import { otpDto } from '@app/contracts/users/otp.dto';
import { loginDto } from '@app/contracts/users/login.dto';
import { requestDto } from '@app/contracts/users/request.dto';
import { ResetPasswordDto } from '@app/contracts/users/resetPassword.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() createUserDto: createUserDto) {
    return this.authService.register(createUserDto);
  }
  catch (error) {
    throw new InternalServerErrorException(
      `user creation failed: ${error.message}`,
    );
  }

  // @Post('verify-otp')
  // async verifyOtp(
  //   @Body() otpDto: otpDto,
  //   @Headers('Authorization') token: string,
  // ) {
  //   const bearerToken = token.split(' ')[1];
  //   return this.authService.verifyOtp(otpDto, bearerToken);
  // }

  // @Post('login')
  // async login(@Body() loginDto: loginDto, @Res({ passthrough: true }) res: Response) {
  //   return this.authService.login(loginDto, res);
  // }

  // @Post('request-password-reset')
  // async requestPasswordReset(@Body() requestDto: requestDto) {
  //   return this.authService.requestPasswordReset(requestDto);
  // }

  // @Post('reset-password')
  // async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Headers('Authorization') token: string) {
  //   const bearerToken = token.split(' ')[1];
  //   return this.authService.resetPassword(resetPasswordDto, bearerToken);
  // }

  // @Get('refresh-token')
  // async refreshToken(@Req() req: Request) {
  //   return this.authService.refreshToken(req);
  // }

  // @Post('logout')
  // async logout(@Req() req: Request) {
  //   return this.authService.logout(req);
  // }
}

// import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Headers,Req } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { createUserDto } from '@app/contracts/users/createUser.dto';
// import { otpDto } from '@app/contracts/users/otp.dto';
// import { loginDto } from '@app/contracts/users/login.dto';
// import { requestDto } from '@app/contracts/users/request.dto';
// import { ResetPasswordDto } from '@app/contracts/users/resetPassword.dto';
// import { Response,Request } from 'express';
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() registerDto: createUserDto) {
//     return this.authService.register(registerDto);
//   }
//   @Post('verify-otp')
//   async verifyOtp(
//     @Body() otpDto:otpDto,
//     @Headers('Authorization') token: string,
//   ) {
//     const bearerToken = token.split(' ')[1];

//     return this.authService.verifyOtp(otpDto, bearerToken);
//   }
//   @Post('login')
//   async login(
//     @Body() loginDto: loginDto,
//     @Res({ passthrough: true }) res: Response, // <-- Now the correct type
//   ) {
//     return this.authService.login(loginDto,res);
//   }

//   @Post('request-password-reset')
//   async requestPasswordReset(@Body() requestDto:requestDto){
//     return this.authService.requestPasswordReset(requestDto);
//   }

 
//   @Post('reset-password')
//   async resetPassword(@Body() resetPasswordDto: ResetPasswordDto , @Headers('Authorization') token: string, ) {
//     const bearerToken = token.split(' ')[1];
//     return this.authService.resetPassword(resetPasswordDto,bearerToken);
//   }
//   @Get('refresh-token')
//   async refreshToken(@Req() req: Request) {
//     return this.authService.refreshToken(req);
//   }
 
//   @Post('logout')
//   async logout(@Res() res: Response) {
//     return this.authService.logout(res);
//   }

// } 





