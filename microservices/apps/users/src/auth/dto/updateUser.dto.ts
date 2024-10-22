import {IsString,IsNotEmpty,IsBoolean, IsDate} from 'class-validator'

export class updateUserDto{
    @IsString()
    @IsNotEmpty()
    email:string;
    @IsString()
    @IsNotEmpty()
    password:string;
    @IsString()
    @IsNotEmpty()
    username:string;
    @IsString()
    @IsNotEmpty()
    role:string;
    @IsString()
    @IsNotEmpty()
    phoneNumber:string;
}