import {IsNotEmpty, IsEmail} from 'class-validator'

export class requestDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;
    
 
}