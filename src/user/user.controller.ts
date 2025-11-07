import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config_enum';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private ConfigService: ConfigService
    ) { }
    @Get()
    test() {
        const db = this.ConfigService.get(ConfigEnum.DB)
        const DB_URL = this.ConfigService.get('DB_URL')
        console.log('db', db, DB_URL)
        return this.ConfigService.get('DB') //获取配置文件的值
        // return this.userService.gethe()
    }
}
