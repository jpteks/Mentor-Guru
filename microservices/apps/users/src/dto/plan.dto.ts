// create-plan.dto.ts
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsEnum(['Free', 'Basic', 'Premium'])
  packageName: string;

  @IsOptional() // Optional, because it defaults to true
  @IsBoolean()
  accessToPastPapers?: boolean;

  @IsOptional() // Optional, because it defaults to true
  @IsBoolean()
  accessToPdfSolutions?: boolean;

  @IsOptional() // Optional, because it defaults to true
  @IsBoolean()
  accessToRestrictedVideos?: boolean;

  @IsOptional() // Optional, because it defaults to false
  @IsBoolean()
  accessToVideoSolutions?: boolean;

  @IsOptional() // Optional, because it defaults to false
  @IsBoolean()
  downloadablePapers?: boolean;

  @IsOptional() // Optional, because it defaults to false
  @IsBoolean()
  accessToAllCourses?: boolean;

  @IsOptional() // Optional, because it defaults to false
  @IsBoolean()
  downloadableAnswers?: boolean;

  @IsOptional() // Optional, because it defaults to false
  @IsBoolean()
  downloadableVideos?: boolean;
}
