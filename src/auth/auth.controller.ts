import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}
    @Post('signin')
    signIn(@Body() dto:signUpDTO){
        return this.authservice.signIn(dto)
    }
    @Post('signup')
    signUp(@Body() dto:signUpDTO){
            return this.authservice.signUp(dto)
    }
}
