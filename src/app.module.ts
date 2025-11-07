import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    //ConfigModule.forRoot(),这个forRoot()方法就是读取根目录下面.env文件的方法
    //isGlobal: true  全局启用这个配置文件  
    imports: [UserModule, ConfigModule.forRoot({ isGlobal: true })
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
