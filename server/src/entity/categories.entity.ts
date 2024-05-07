
import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column()
    categoryName: string;

    @OneToMany(() => Products, (product) => product.categories)
    products: Products[]
}