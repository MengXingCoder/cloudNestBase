import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
@Module({
    imports: [
        // ConfigModule.forRoot()
        // forFeature()：用于在特定功能模块中注册实体（Entity），以便在该模块的 Providers（如 Service）中使用 Repository。
        // 在当前模块（Module）中注册 User 实体，并让 NestJS 能够通过 @InjectRepository(User) 注入对应的 Repository<User> 在services中
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {

}
