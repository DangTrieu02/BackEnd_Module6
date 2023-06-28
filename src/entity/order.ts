// order-entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Home } from "./home";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.orders)
  user: User;
  @Column()
  checkIn: Date;
  @Column()
  checkOut: Date;
  @Column({ default: "waiting" })
  status: string;
  @ManyToOne(() => Home, (home) => home.idHome)
  home: Home;
}
