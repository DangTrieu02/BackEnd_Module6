// home-entity.ts
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category";
import {User} from "./user";

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
    @Column()
    floorArea: number;
    @Column()
    bedrooms: number;
    @Column()
    bathrooms: number;
    @OneToMany(() => Category, (idCategory) => idCategory.idCategory)
    idCategory: Category[];
    @Column()
    image: string;
    @Column({default: 0})
    count: number;
    @ManyToOne(() => User, (idUser) => idUser.idUser)
    idUser: User[];
    @Column()
    status: string;
}