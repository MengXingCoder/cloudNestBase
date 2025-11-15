import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

    //查找所有用户
    async findAllUser() {
        const res = await this.repository.find()
        console.log('res', res)
        return res
    }
    //查找指定用户
    async findUser(username: string) {
        return await this.repository.findOne({ where: { username } })
    }
    async create(user: User) {
        const userTemp = await this.repository.create(user)
        return this.repository.save(userTemp)
    }
    async updateUser(id: number, user: Partial<User>) {
        return this.repository.update(id, user)
    }
    async removeUser(id: number) {
        return await this.repository.delete(id)
    }
}
