import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsEmail,
  MinLength,
  IsOptional,
} from 'class-validator';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  role: string;
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  region: string;
  @IsString()
  @IsNotEmpty()
  otp: string;
  @IsBoolean()
  isActive: boolean;
  @IsBoolean()
  isEmailVerified: boolean;
  @IsDate()
  otpExpiry: Date;
  @IsDate()
  lastLogin: Date;
  @IsOptional()
  subscription: string;
  @IsOptional()
  subscriptionDate: Date;
  @IsOptional()
  subscriptionExpiresAt: Date;
}
