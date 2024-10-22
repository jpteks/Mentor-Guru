import { IsString, IsOptional } from 'class-validator';

export class updateUserDto {
  @IsString()
  @IsOptional()
  password?: string;
  @IsString()
  @IsOptional()
  username: string;
  @IsString()
  @IsOptional()
  phoneNumber: string;
  @IsString()
  @IsOptional()
  region: string;
}
