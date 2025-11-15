import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config_enum';
import { User } from 'src/entities/entities/User';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private ConfigService: ConfigService
    ) { }

    @Get()
    findAll() { //查询所有用户
        // const db = this.ConfigService.get(ConfigEnum.DB)
        // // const DB = this.ConfigService.get('db')
        // console.log('db', db) 
        // return this.ConfigService.get('') //获取配置文件的值
        return this.userService.findAllUser()
    }

    @Post()
    createUser() {  //创建插入用户
        const user = { username: "tom", password: "123" } as User
        return this.userService.create(user)
    }

    @Get('/profile')
    getProfileInfo() {
        return this.userService.findProfile(2)
    }
    @Get('/logs')
    findLogs1() {
        return this.userService.findLogs(2)
    }
    @Get('/roles')
    findroles1() {
        return this.userService.findroles(2)
    }

}
