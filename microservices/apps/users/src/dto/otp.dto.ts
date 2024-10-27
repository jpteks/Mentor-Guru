import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsEmail,
  MinLength,
  IsNumber,
} from 'class-validator';

export class otpDto {
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
