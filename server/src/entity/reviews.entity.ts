import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, Timestamp} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Users } from "./users.entity";
import { Products } from "./products.entity";

@Entity()
export class Reviews {
    @PrimaryColumn()
    reviewId: string = uuidv4()

    @Column()
    content: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createDate: Timestamp;

    @Column()
    rate: number;

    @Column()
    userId: string;

    @Column()
    productId: string;

    @ManyToOne(() => Users, (user) => user.reviews)
    @JoinColumn({ name: 'userId' })
    user: Users;

    @ManyToOne(() => Products, (user) => user.reviews)
    @JoinColumn({ name: 'productId' })
    products: Products

}