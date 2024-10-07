import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  subject: string;
}
