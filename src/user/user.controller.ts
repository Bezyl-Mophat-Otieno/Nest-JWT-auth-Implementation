import { Controller, Get, Req , Put} from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { Request } from "express";
import { RolesGuard } from "src/roles/roles.guard";
import { Roles } from "src/roles/roles.decorator";




@Controller('users')
export class UserController{


    constructor(private userService:UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getInfo(@Req() req:Request ){
        interface dto {
            userId : number,
            email : string
        }
        const user  = req.user as dto
        return this.userService.getInfo(user);
    }
    @Roles(['admin'])
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Put('update')
    updateInfo(){

        return 'Updated user'
    }
}