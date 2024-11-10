import {
    IsString,
    IsEnum,
    IsOptional,
    IsBoolean,
} from 'class-validator';

export class UpdateSubscriptionDto {
    @IsString()
    @IsEnum(['Free', 'Basic', 'Premium'])
    @IsOptional()
    packageName?: string;

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
    // @IsOptional()
    // expirationDate?: Date; 
    // @IsOptional() // Optional if you want to update the expiration date
    // subscriptionDate?: Date; 
}