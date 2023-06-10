// user-entity.ts
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    avatar: string;
    @Column({default: 'user'})
    role: string;
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}