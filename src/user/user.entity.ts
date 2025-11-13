import { Profile } from "./profile.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    @Column()
    password: string


    //一对一的关系，() => Profile:（代表当前实体User）和 Profile 实体 建立一对一关系
    // 为什么使用箭头函数 是为了避免循环依赖 ( User 实体引用了 Profile，而 Profile 实体又引用了 User)
    // (profile) => profile.user 是在Profile中使用user指向User实体
    // Profile 实体中，有一个叫 user 的属性，它指回当前这个 User 实体。


    // 就是双方要建立联系就要 双方互相知道，建立关联关系
    //  User有一个 profile 字段，它对应 Profile 实体；
    // 而在 Profile 实体里，有一个叫 user 的字段，它指回我（User实体）。
    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile
}