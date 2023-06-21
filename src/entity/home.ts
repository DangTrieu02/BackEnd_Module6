// home-entity.ts
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category";
import {User} from "./user";
import { Image } from "./image";

@Entity()
export class Home {
    @PrimaryGeneratedColumn()
    idHome: number;
    @Column()
    nameHome: string;
    @Column()
    address: string;
    @Column()
    description: string;
    @Column()
    price: number;
    @Column({default: 0})
    floorArea: number;
    @Column({default: 0})
    bedrooms: number;
    @Column({default: 0})
    bathrooms: number;
    @ManyToOne (() => Category, (category) => category.home)
    @JoinColumn()
    category: Category
    @OneToMany(() => Image, (image) => image.home)
    image: Image[];
    @Column({default: 0})
    count: number;
    @ManyToOne(() => User, (user) => user.homes)
    @JoinColumn()
    user: User
    @Column({default: "rent"})
    status: string;
}