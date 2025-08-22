import { Cart } from "src/cart/entities/cart.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ default: 'customer' })
    roles: string;    

    @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
    cart: Cart;

}