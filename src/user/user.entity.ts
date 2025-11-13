import { Logs } from "src/logs/logs.entity";
import { Profile } from "./profile.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "src/roles/roles.entity";

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


    //一个用户可能有多种日志，也就是一对多的关系
    @OneToMany(() => Logs, (logs) => logs.user)
    logs: Logs[]

    //角色roles和用户users 是多对多的关系
    // 谁加 @JoinTable()，谁就是“拥有方（owner side） 一般都是从用户查询角色
    @ManyToMany(() => Roles, roles => roles.users)
    @JoinTable({ name: "users_roles" }) //中间表
    roles: Roles[]


    //多对多 例外情况 
    // 当中间表有“业务字段”（如时间、状态、备注）→ 必须创建中间实体，用两个 @ManyToOne + 两个 @OneToMany 反向引用
    // 如果中间表不只是关联 ID，还有额外信息，例如：// user_roles 表新增字段
    // 分配时间--> assignedAt: Date; 谁分配的-->assignedBy: string;
    // 就需要将中间表提升为一个独立实体
    // 创建 user-role.entity.ts 实体文件
    // import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne } from 'typeorm';
    // import { User } from './user.entity'; //导入User实体
    // import { Role } from './role.entity'; //导入Role实体

    // @Entity('user_roles')
    // export class UserRole {
    //   @PrimaryGeneratedColumn()
    //   id: number;
    // 多对一：这个分配记录属于哪个用户
    //   @ManyToOne(() => User, (user) => user.userRoles)
    //   user: User;
    // 多对一：这个分配记录对应哪个角色
    //   @ManyToOne(() => Role, (role) => role.userRoles)
    //   role: Role;

    //   @CreateDateColumn()
    //   assignedAt: Date;

    //   @Column()
    //   assignedBy: string;
    // }

    //  还需要修改 User和Role
    // user.entity.ts
    //  一对多：一个 User 可以有多个 UserRole 记录
    // @OneToMany(() => UserRole, (userRole) => userRole.user)
    // userRoles: UserRole[];

    // role.entity.ts
    // @OneToMany(() => UserRole, (userRole) => userRole.role)
    // userRoles: UserRole[];
}