import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    IsEnum,
    IsBoolean,
    IsOptional,
  } from 'class-validator';
  import { UserRole } from '../schemas/User.schema';
  
  export class createSubscriptionDto {
    @IsString()
    @IsEnum(['Free', 'Basic', 'Premium'])
    packageName: string;

    // @IsBoolean()
    // @IsOptional()
    // accessToPastPapers?: boolean;

    // @IsBoolean()
    // @IsOptional()
    // accessToPdfSolutions?: boolean;

    // @IsBoolean()
    // @IsOptional()
    // accessToRestrictedVideos?: boolean;

    // @IsBoolean()
    // @IsOptional()
    // accessToVideoSolutions?: boolean;

    // @IsBoolean()
    // @IsOptional()
    // downloadablePapers?: boolean;

    // @IsBoolean()
    // @IsOptional()
    // accessToAllCourses?: boolean;
    // @IsBoolean()
    // @IsOptional()
    // downloadableAnswers?:boolean;
    // @IsBoolean()
    // @IsOptional()
    // downloadableVideos?:boolean;
    // @IsOptional()
    // subscriptionDate?: Date;
    // @IsOptional()
    // subscriptionExpiresAt?: Date;


   

  }
  