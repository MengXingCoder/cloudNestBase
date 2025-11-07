import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private ConfigService: ConfigService
    ) { }
    @Get()
    test() {
        return this.ConfigService.get('DB') //获取配置文件的值
        // return this.userService.gethe()
    }
}
