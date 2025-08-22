import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./entities/cart.entity";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { CartItemsModule } from "src/cart-items/cart-items.module";

@Module({
    imports:[TypeOrmModule.forFeature([Cart]),CartItemsModule],
    controllers:[CartController],
    providers : [CartService],
    exports : [CartService]
})
export class CartModule {}