import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "./entities/cart-item.entity";
import { CartItemsController } from "./cart-items.controller";
import { CartItemsService } from "./cart-items.service";


@Module({
    imports:[TypeOrmModule.forFeature([CartItem])],
    controllers : [CartItemsController],
    providers : [CartItemsService],
    exports : [CartItemsService]
})
export class CartItemsModule{}