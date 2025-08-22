import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./entities/cart.entity";
import { User } from "src/user/entities/user.entity";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

@Module({
    imports:[TypeOrmModule.forFeature([Cart])],
    controllers:[CartController],
    providers : [CartService],
    exports : [CartService]
})
export class CartModule {}