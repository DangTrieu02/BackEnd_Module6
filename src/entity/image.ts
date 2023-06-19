// image-entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Home } from "./home";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    idImage: number;

    @Column({ type: "longtext" })
    image: string;

    @ManyToOne(() => Home, (home) => home.image)
    @JoinColumn()
    home: Home;
}
