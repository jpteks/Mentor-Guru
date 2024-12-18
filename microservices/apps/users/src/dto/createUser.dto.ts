import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsEnum,IsOptional,IsMongoId
} from 'class-validator';
import { UserRole } from '../schemas/User.schema';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a correct email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole, {
    message: "Please enter a correct role: 'admin' or 'student'",
  })
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  region: string;

}
