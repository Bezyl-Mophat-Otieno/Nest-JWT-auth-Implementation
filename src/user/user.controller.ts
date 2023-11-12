import { Controller, Get, Req , Put, Param, ParseIntPipe, Body, Delete} from "@nestjs/common";
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
    @Put(':id')
    async updateInfo(@Param('id', ParseIntPipe ) id:number , @Body() dto:any ){
        const updateInfo = {...dto , id}
        return this.userService.updateInfo(updateInfo)
    }
    
    @Roles(['admin'])
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Get(':id')
    async getUser(@Param('id',ParseIntPipe) id:number){

        return this.userService.getUser(id)

    }

    @Roles(['admin'])
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Get()
    async getAllUsers(){

        return this.userService.getAllUsers()

    }

    @Roles(['admin'])
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Delete(':id')
    async deleteUser(@Param('id',ParseIntPipe) id:number){

        return this.userService.deleteUser(id)

    }

}