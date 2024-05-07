import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Users } from "./users.entity";
import { Products } from "./products.entity";

@Entity()
export class Carts {
    @PrimaryColumn()
    cartId: string = uuidv4()

    @Column()
    quantityCart: number;

    @Column()
    userId: string;

    @Column()
    productId: string;

    @ManyToOne(() => Users, (user) => user.cart,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
    @JoinColumn({ name: 'userId' })
    user: Users[];

    @ManyToOne(() => Products, (product) => product.carts)
    @JoinColumn({ name: 'productId' })
    product: Products[];
}