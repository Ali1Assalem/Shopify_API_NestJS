import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Product } from "src/products/entities/product.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";


@Module({
    imports : [TypeOrmModule.forFeature([Category , Product])],
    controllers : [CategoryController],
    providers : [CategoryService],
    exports: [ CategoryService]
}) 
export class CategoryModule {}