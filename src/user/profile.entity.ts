import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    gender: number;
    @Column()
    photo: string;
    @Column()
    address: string;
    @JoinColumn()  //外键  一般是“多” 或 “从属” 的一方 持有外键。
    @OneToOne(() => User, user => user.profile)
    user: User


}