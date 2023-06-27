// user-entity.ts
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order";
import { Home } from "./home";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser: number;
    @Column()
    fullName: string;
    @Column()
    phoneNumber: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({type:"text"})
    avatar: string;
    @Column({default: 'user'})
    role: string;
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
    @OneToMany( () => Home, (home) => home.user)
    home: Home[]
}