// order-entity.ts
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";
import { Home } from "./home";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.orders)
    user: User;
    @Column({ type: 'date', nullable: false })
    checkIn: Date;
    @Column({ type: 'date', nullable: false })
    checkOut: Date;
    @Column({ default: "waiting" })
    status: string;
    @ManyToOne(() => Home, (home) => home.idHome)
    home: Home;
}