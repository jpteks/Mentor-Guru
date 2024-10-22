import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class loginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
