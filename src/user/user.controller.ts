import { Controller, Get, Req } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { Request } from "express";




@Controller('users')
export class UserController{


    constructor(private userService:UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getInfo(@Req() req:Request ){
        interface dto {
            userId : number,
            username : string
        }
        const user  = req.user as dto
        return this.userService.getInfo(user);
    }
}