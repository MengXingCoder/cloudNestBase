import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv'
import Configuration from './configuration';
import * as Joi from 'joi'


//环境配置文件抽离出来，如果设置了NODE_ENV 就取NODE_ENV 否则取development
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`



//安装 cross-env的包
//然后在package.json中修改启动方式
//分别加上 cross-env NODE_ENV=development || production
// "start:dev": "cross-env NODE_ENV=development start --watch",
// "start:prod": "cross-env NODE_ENV=production node dist/main",
@Module({
    //ConfigModule.forRoot(),这个forRoot()方法就是读取根目录下面.env文件的方法
    //isGlobal: true  全局启用这个配置文件  
    imports: [UserModule, ConfigModule.forRoot({
        isGlobal: true,
        // envFilePath,
        // //load 是需要一个函数，包含着键值对，
        // load: [() => dotenv.config({ path: ".env" })]
        load: [Configuration],
        validationSchema: Joi.object({

        })
    })
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
