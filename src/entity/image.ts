// image-entity.ts
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Home} from "./home";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    idImage: number;

    @Column({type: "text"})
    image: string;

    @ManyToOne(() => Home, (home) => home.image)
    home: string;
}
