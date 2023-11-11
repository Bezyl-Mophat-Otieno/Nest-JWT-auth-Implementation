import { IsEmail, IsNotEmpty , IsString, isAlphanumeric } from 'class-validator';



export class signInDTO {

    @IsNotEmpty()
    @IsEmail()
    email:string ;

    @IsNotEmpty()
    password:string ;
}

export  class signUpDTO {
    @IsNotEmpty()
    @IsEmail()
    email:string ;
    @IsNotEmpty()
    @IsString()
    password:string ;
    @IsNotEmpty()
    @IsNotEmpty()
    firstName:string;
    @IsNotEmpty()
    lastName:string;
    @IsNotEmpty()
    @IsString()
    role:string;

}