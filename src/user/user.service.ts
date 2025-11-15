import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Logs } from '../logs/logs.entity';
import { Roles } from 'src/roles/roles.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
        @InjectRepository(Roles) private readonly rolesRepositorty: Repository<Roles>
    ) { }

    //查找所有用户
    async findAllUser() {
        const res = await this.userRepository.find()
        console.log('res', res)
        return res
    }
    //查找指定用户
    async findUser(username: string) {
        return await this.userRepository.findOne({ where: { username } })
    }
    async findid(id: number) {
        const res23 = await this.userRepository.findOne({ where: { id } })
        console.log('23', res23)
        return await this.userRepository.findOne({ where: { id } })
    }
    async create(user: User) {
        const userTemp = await this.userRepository.create(user)
        return this.userRepository.save(userTemp)
    }
    async updateUser(id: number, user: Partial<User>) {
        return this.userRepository.update(id, user)
    }
    async removeUser(id: number) {
        return await this.userRepository.delete(id)
    }

    //多表查询 查询 user表和profile 表直接的关联数据
    async findProfile(id: number) {
        const res = await this.userRepository.findOne({ where: { id }, relations: { profile: true } })
        return res
    }
    //查询 user 表和logs表的数据
    async findLogs(id: number) {
        const user = await this.userRepository.findOne({ where: { id } })
        return await this.logsRepository.find({ where: { user }, relations: { user: true } })

    }
    async findroles(id: number) {
        const res = await this.rolesRepositorty.findOne({ where: { id }, relations: ['users'] })
        return res
    }
}
