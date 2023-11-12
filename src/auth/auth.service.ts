import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { signInDTO, signUpDTO } from 'src/dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(private databaseService : DatabaseService , private JWTService : JwtService , private configService:ConfigService){

    }
    async signIn(dto:signInDTO){

        const user = await this.databaseService.user.findUnique({
            where:{
                email:dto.email
            }
        })

        if(!user) return new ForbiddenException('User not found')

        const isMatch = await bcrypt.compare(dto.password , user.password)

        if(!isMatch) return new ForbiddenException('Invalid Credentials')

        const payload ={
            sub:user.id,
            email:user.email
        }
         
        const token = await this.JWTService.signAsync(payload,{
            expiresIn:'30m',
            secret:this.configService.get('JWT_SECRET')

        })
        return {
            access_token : token
        }


    }
    async signUp(dto:signUpDTO){
        const {email , password} = dto
        const user = await this.databaseService.user.findUnique({
            where:{
                email:email
            }
        })

        if(!user){
            const hashedPassword = await bcrypt.hash(password , 10)
            const newUser = await this.databaseService.user.create({
                data:{...dto , password:hashedPassword}
        })

        return newUser;
           
    }
    }
}
