
import {Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Products } from "./products.entity";

@Entity()
export class Images {
    @PrimaryColumn()
    imageId: string = uuidv4()

    @Column()
    imageUrl: string;

    @Column()
    productId: string;

    @ManyToOne(() => Products, (product) => product.images,
    { onDelete: 'CASCADE',
    onUpdate: 'CASCADE',})
    @JoinColumn({ name: 'productId' })
    products: Products
}