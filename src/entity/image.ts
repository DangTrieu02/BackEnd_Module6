// image-entity.ts
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Home} from "./Home";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idImage: number;
    @Column()
    username: string;
    @OneToMany(() => Home, (home) => home.idHome)
    idHome: Home[];
}