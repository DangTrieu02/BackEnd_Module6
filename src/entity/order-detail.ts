// order-detail.ts
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order";
import {Home} from "./home";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    idOrderDetail: number;
    @Column()
    checkIn: string;
    @Column()
    checkOut: string;
    @Column()
    statusOrder: string;
    @ManyToOne(() => Order,(order) => order.idOrder)
    idOrder: Order;
    @ManyToOne(() => Home,(home) => home.idHome)
    idHome: Home;
}