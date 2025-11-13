import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./Profile";
import { Logs } from "./Logs";
import { Roles } from "./Roles";

@Entity("user", { schema: "testdb" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "userId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "rolesId", referencedColumnName: "id" }],
    schema: "testdb",
  })
  roles: Roles[];
}
