import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "./entities/cart-item.entity";
import { CartItemsController } from "./cart-items.controller";
import { CartItemsService } from "./cart-items.service";
import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/products/entities/product.entity";


@Module({
    imports:[TypeOrmModule.forFeature([CartItem,Cart,Product])],
    controllers : [CartItemsController],
    providers : [CartItemsService],
    exports : [CartItemsService]
})
export class CartItemsModule{}