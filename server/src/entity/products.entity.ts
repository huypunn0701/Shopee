import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Stores } from "./stores.entity";
import { Carts } from "./carts.entity";
import { Reviews } from "./reviews.entity";
import { Categories } from "./categories.entity";
import { Images } from "./images.entity";
import { OrderDetails } from "./orderDetail.entity";

@Entity()
export class Products {
    @PrimaryColumn()
    productId: string = uuidv4()

    @Column()
    productName: string;

    @Column()
    price: number;

    @Column({type: 'longtext'})
    description: string;

    @Column()
    quantity: number;

    @Column({nullable:true})
    quantitySold: number;

    @Column()
    imageProduct: string;

    @Column()
    categoryId: number;

    @Column()
    storeId: string;

    @Column({default:0})
    statusProduct: number;

    @ManyToOne(() => Stores, (stores) => stores.products,
    { onDelete: 'CASCADE',
    onUpdate: 'CASCADE',})
    @JoinColumn({ name: 'storeId' })
    stores: Stores

    @OneToMany(() => Carts, (cart) => cart.product)
    carts: Carts[];

    @OneToMany(() => Reviews, (reviews) => reviews.products)
    reviews: Reviews[]

    @ManyToOne(() => Categories, (category) => category.products,
    { onDelete: 'CASCADE',
    onUpdate: 'CASCADE',}
    )
    @JoinColumn({name: "categoryId"})
    categories: Categories

    @OneToMany(() => Images, (image) => image.products,)
    images: Images[]

    @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
    orderDetail: OrderDetails[]
}