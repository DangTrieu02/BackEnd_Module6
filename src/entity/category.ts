// category-entity.ts
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Home} from "./home";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    idCategory: string; // Update the type to string

    @Column()
    nameCategory: string;

    @OneToMany(() => Home, (home) => home.category)
    home: Home[];
    @Column({type:"text"} )
    icon: string;

}
