import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, Timestamp} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Users } from "./users.entity";
import { Stores } from "./stores.entity";
import { OrderDetails } from "./orderDetail.entity";

@Entity()
export class Orders {
    @PrimaryColumn()
    orderId: string = uuidv4()

    @Column()
    addressOrder: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createDateOrder: Timestamp;

    @Column()
    phoneOrder: string;

    @Column()
    totalPrice: number;

    @Column()
    nameOrder: string;

    @Column({default:"pending"})
    statusOrder: string;

    @Column()
    userId: string;

    @Column()
    storeId: string;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: 'userId' })
    users: Users;

    @ManyToOne(() => Stores, (store) => store.orders)
    @JoinColumn({ name: 'storeId' })
    stores: Stores
    
    @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.orders)
    orderDetail: OrderDetails[]
}