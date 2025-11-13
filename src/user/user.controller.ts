import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config_enum';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private ConfigService: ConfigService
    ) { }


    test() {
        // const db = this.ConfigService.get(ConfigEnum.DB)
        // // const DB = this.ConfigService.get('db')
        // console.log('db', db) 
        // return this.ConfigService.get('') //获取配置文件的值
        return ''

    }
}
