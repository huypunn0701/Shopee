import { Users } from 'src/entity/users.entity';
import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany, Timestamp} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Products } from './products.entity';
import { Orders } from './orders.entity';

@Entity()
export class Stores {
    @PrimaryColumn()
    storeId: string = uuidv4()

    @Column()
    storeName: string;

    @Column()
    addressStore: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdDateStore: Timestamp;

    @Column()
    phone: string;

    @Column()
    userId: string;

    @Column()
    emailStore: string;

    @Column({default:0})
    statusstore: number;

    @OneToOne(() => Users, (user)=>user.store,
    { onDelete: 'CASCADE',
    onUpdate: 'CASCADE',})
    @JoinColumn({name: "userId"})
    user: Users

    @OneToMany(() => Products, (products) => products.stores)
    products: Products[];

    @OneToMany(() => Orders, (order) => order.stores)
    orders: Orders[]
}