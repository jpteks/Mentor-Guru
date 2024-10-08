import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_PATTERNS } from '@app/contracts/users/user.patterns';
import { createUserDto } from '@app/contracts/users/createUser.dto';
import { otpDto } from '@app/contracts/users/otp.dto';
import { loginDto } from '@app/contracts/users/login.dto';
import { requestDto } from '@app/contracts/users/request.dto';
import { ResetPasswordDto } from '@app/contracts/users/resetPassword.dto';
import { Request, Response } from 'express';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  // Register
  register(createUserDto: createUserDto): Observable<any> {
    return this.authClient.send(AUTH_PATTERNS.REGISTER, createUserDto).pipe(
      catchError((error) => {
        throw new InternalServerErrorException(`Registration failed ohh: ${error.message}`);
      }),
    );
  }

  // OTP Verification
  verifyOtp(otpDto: otpDto, token: string): Observable<any> {
    const payload = { otpDto, token };
    return this.authClient.send(AUTH_PATTERNS.VERIFY_OTP, payload).pipe(
      catchError((error) => {
        throw new InternalServerErrorException(`OTP Verification failed: ${error.message}`);
      }),
    );
  }

  // Login
  login(loginDto: loginDto, res: Response): Observable<any> {
    const payload = { loginDto };
    return this.authClient.send(AUTH_PATTERNS.LOGIN, payload).pipe(
      catchError((error) => {
        throw new InternalServerErrorException(`Login failed: ${error.message}`);
      }),
    );
  }

  // Request Password Reset
  requestPasswordReset(requestDto: requestDto): Observable<any> {
    return this.authClient.send(AUTH_PATTERNS.REQUEST_PASSWORD_RESET, requestDto).pipe(
      catchError((error) => {
        throw new InternalServerErrorException(`Password reset request failed: ${error.message}`);
      }),
    );
  }

  // Reset Password
  resetPassword(resetPasswordDto: ResetPasswordDto, token: string): Observable<any> {
    const payload = { resetPasswordDto, token };
    return this.authClient.send(AUTH_PATTERNS.RESET_PASSWORD, payload).pipe(
      catchError((error) => {
        throw new InternalServerErrorException(`Password reset failed: ${error.message}`);
      }),
    );
  }

  // Refresh Token
  refreshToken(req: Request): Observable<any> {
    return this.authClient.send(AUTH_PATTERNS.REFRESH_TOKEN, req).pipe(
      catchError((error) => {
        throw new InternalServerErrorException(`Token refresh failed: ${error.message}`);
      }),
    );
  }

  // Logout
  logout(req: Request): Observable<any> {
    return this.authClient.send(AUTH_PATTERNS.LOGOUT, req).pipe(
      catchError((error) => {
        throw new InternalServerErrorException(`Logout failed: ${error.message}`);
      }),
    );
  }
}


// import { ClientProxy } from '@nestjs/microservices';
// import {
//   BadRequestException,
//   ForbiddenException,
//   Inject,
//   Injectable,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import { catchError, Observable } from 'rxjs';
// import { AUTH_PATTERNS } from '@app/contracts/users/user.patterns';
// import { createUserDto } from '@app/contracts/users/createUser.dto';
// import { updateUserDto } from '@app/contracts/users/updateUser.dto';
// import { loginDto } from '@app/contracts/users/login.dto';
// import { requestDto } from '@app/contracts/users/request.dto';
// import { otpDto } from '@app/contracts/users/otp.dto';
// import { ResetPasswordDto } from '@app/contracts/users/resetPassword.dto';

// @Injectable()
// export class AuthService {
//   constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

//   register(createUserDto: createUserDto): Observable<any> {
//     const payload = createUserDto;
//     return this.authClient.send(AUTH_PATTERNS.REGISTER, payload).pipe(
//       catchError((error) => {
//         throw new InternalServerErrorException(` ${error.message} `);
//       }),
//     );
//   }
//   verifyOtp(otpDto: otpDto,token:string): Observable<any> {
//     const payload = [{otpDto:otpDto},{token:token}];
//     return this.authClient.send(AUTH_PATTERNS.VERIFY_OTP, payload).pipe(
//       catchError((error) => {
//         throw new InternalServerErrorException(` ${error.message} `);
//       }),
//     );
//   }
//   login(loginDto:loginDto,res:Response): Observable<any> {
//     const payload = [{loginDto:loginDto},{res:res}];
//     return this.authClient.send(AUTH_PATTERNS.LOGIN, payload).pipe(
//       catchError((error) => {
//         throw new InternalServerErrorException(` ${error.message} `);
//       }),
//     );
//   }
//   requestPasswordReset(requestDto:requestDto): Observable<any> {
//     const payload = [{requestDto:requestDto}];
//     return this.authClient.send(AUTH_PATTERNS.REQUEST_PASSWORD_RESET, payload).pipe(
//       catchError((error) => {
//         throw new InternalServerErrorException(` ${error.message} `);
//       }),
//     );
//   }
//   resetPassword(resetPasswordDto:ResetPasswordDto,): Observable<any> {
//     const payload = [{resetPasswordDto:resetPasswordDto}];
//     return this.authClient.send(AUTH_PATTERNS.RESET_PASSWORD, payload).pipe(
//       catchError((error) => {
//         throw new InternalServerErrorException(` ${error.message} `);
//       }),
//     );
//   }
//   refreshToken(req:Request): Observable<any> {
    
//     return this.authClient.send(AUTH_PATTERNS.REFRESH_TOKEN, req).pipe(
//       catchError((error) => {
//         throw new InternalServerErrorException(` ${error.message} `);
//       }),
//     );
//   }
//   logout(requestDto:requestDto): Observable<any> {
//     const payload = [{requestDto:requestDto}];
//     return this.authClient.send(AUTH_PATTERNS.LOGOUT, payload).pipe(
//       catchError((error) => {
//         throw new InternalServerErrorException(` ${error.message} `);
//       }),
//     );
//   }




// }

