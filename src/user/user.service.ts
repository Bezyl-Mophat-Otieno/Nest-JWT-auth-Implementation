import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UserService {

    constructor(private databaseService: DatabaseService){}

    async getInfo(user){
        console.log(user)
        const userInfo = await this.databaseService.user.findUnique({
            where:{
                email:user.username
            }
        })
        return  userInfo
    }
}
