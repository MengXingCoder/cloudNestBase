import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("logs", { schema: "testdb" })
export class Logs {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "result" })
  result: number;

  @Column("varchar", { name: "method", length: 255 })
  method: string;

  @Column("varchar", { name: "path", length: 255 })
  path: string;

  @Column("varchar", { name: "data", length: 255 })
  data: string;

  @ManyToOne(() => User, (user) => user.logs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
