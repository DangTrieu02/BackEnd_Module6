// order-entity.ts
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";
import {OrderDetail} from "./order-detail";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    idOrder: number;
    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.idOrder)
    orderDetails: OrderDetail[];
    @ManyToOne(() => User, (user) => user.orders)
    user: User;
}