import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  subject: string;
}
