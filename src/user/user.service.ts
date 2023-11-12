import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UserService {

    constructor(private databaseService: DatabaseService){}

    async getInfo(user){
        console.log(user)
        const userInfo = await this.databaseService.user.findUnique({
            where:{
                email:user.email
            }
        })
        return  userInfo
    }
    async updateInfo(updateInfo){

        const {id , ...data} = updateInfo
        
        const existingUser = await this.databaseService.user.findUnique({
            where:{
                id:updateInfo.id
            }
        })

        if(!existingUser) return new Error('User Not Found')

        const updatedUser = await this.databaseService.user.update({
            where:{
                id:updateInfo.id
            },
            data:data
        })

return updatedUser


    }


    async getUser(id){
        const user = await this.databaseService.user.findUnique({
            where:{
                id:id
            }
        })

        return user;

    }

    async getAllUsers (){
        const users = await this.databaseService.user.findMany()
        return users
    }

    async deleteUser(id){
        const deleted = await this.databaseService.user.delete({
            where:{
                id:id
            }
        })
        return deleted
    }
}
