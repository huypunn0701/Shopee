import {Entity, Column, PrimaryColumn, OneToMany, Timestamp, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Reviews } from "./reviews.entity";
import { Orders } from "./orders.entity";
import { Stores } from "./stores.entity";
import { Carts } from "./carts.entity";

@Entity()
export class Users {
    @PrimaryColumn()
    userId: string = uuidv4()

    @Column()
    userName: string;

    @Column({nullable:true})
    fullName: string;

    @Column()
    password: string;

    @Column({type: 'longtext', nullable:true})
    avatarUrl: string;
    
    @Column({ nullable:true}) 
    email: string;

    @Column({nullable:true})
    address: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdDate: Timestamp;

    @Column({nullable:true})
    phone: string;

    @Column({nullable:true})
    gender: string;

    @Column({default:0})
    statusUser: number;

    @Column({nullable:true})
    birthDay: string;

    @OneToOne(()=>Stores, store=>store.user) 
    store: Stores

    @OneToMany(()=>Carts, cart=>cart.user) 
    cart: Carts[];

    @OneToMany(() => Reviews, (reviews) => reviews.user)
    reviews: Reviews[];

    @OneToMany(() => Orders, (order) => order.users)
    orders: Orders[];
}