import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";

@Entity()
export class OrderDetails {
    @PrimaryColumn()
    orderDetailId: string = uuidv4()

    @Column()
    quantityOrder: number;

    @Column()
    priceOrder: number;

    @Column()
    orderId: string;

    @Column()
    productId: string;

    @ManyToOne(() => Orders, (order) => order.orderDetail,
    { onDelete: 'CASCADE',
    onUpdate: 'CASCADE',})
    @JoinColumn({ name: 'orderId' })
    orders: Orders;

    @ManyToOne(() => Products, (product) => product.orderDetail,
    { onDelete: 'CASCADE',
    onUpdate: 'CASCADE',})
    @JoinColumn({ name: 'productId' })
    products: Products;

}