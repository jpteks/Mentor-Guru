import { IsString, IsNotEmpty } from 'class-validator';

export class otpDto {
  @IsNotEmpty()
  @IsString()
  otp: string;
}
