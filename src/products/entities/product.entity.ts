import { CartItem } from "src/cart-items/entities/cart-item.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @ManyToOne(()=> Category , (cateory)=> cateory.products)
  category : Category

  @OneToMany(()=>CartItem,(cartItem)=>cartItem.product)
  cartItems:CartItem[]
}