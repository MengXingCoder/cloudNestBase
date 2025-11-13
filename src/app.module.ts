import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv'
import Configuration from './configuration';
import * as Joi from 'joi'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from './enum/config_enum';


//环境配置文件抽离出来，如果设置了NODE_ENV 就取NODE_ENV 否则取development
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`

//安装 cross-env的包
//然后在package.json中修改启动方式
//分别加上 cross-env NODE_ENV=development || production
// "start:dev": "cross-env NODE_ENV=development start --watch",
// "start:prod": "cross-env NODE_ENV=production node dist/main",
@Module({
    //ConfigModule.forRoot(), 这个forRoot()方法就是读取根目录下面.env文件的方法
    //isGlobal: true  全局启用这个配置文件  
    imports: [UserModule, ConfigModule.forRoot({
        isGlobal: true,
        envFilePath,
        // //load 是需要一个函数，包含着键值对，
        load: [() => dotenv.config({ path: ".env" })],
        // load: [Configuration],
        validationSchema: Joi.object({
            NODE_ENV: Joi.string().valid('development', 'production').default('default'),
            DB_PORT: Joi.number().default(3306),
            DB_URL: Joi.string().domain(),
            DB_HOST: Joi.string().ip(),
            DB_TYPE: Joi.string().valid('mysql'),
            DB_DATABASE: Joi.string().required(),
            DB_USERNAME: Joi.string().required(),
            DB_PASSWORD: Joi.string().required(),
            DB_SYNC: Joi.boolean().default(false)
        })
    }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (ConfigService: ConfigService) => ({
                type: 'mysql',
                host: ConfigService.get(ConfigEnum.DB_HOST),
                port: ConfigService.get(ConfigEnum.DB_PORT),
                username: ConfigService.get(ConfigEnum.DB_USERNAME),
                password: ConfigService.get(ConfigEnum.DB_PASSWORD),
                database: ConfigService.get(ConfigEnum.DB_DATABASE),
                synchronize: ConfigService.get(ConfigEnum.DB_SYNC),
                entities: [],
                logging: ['error']
            } as TypeOrmModuleOptions)

        })
        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: '127.0.0.1',
        //     port: 3306,
        //     username: 'root',
        //     password: 'example',
        //     database: 'testdb',
        //     logging: ['error']
        // })
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
