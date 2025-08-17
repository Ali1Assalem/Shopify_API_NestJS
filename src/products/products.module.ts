import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductService } from "./prodduct.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Category } from "src/category/entities/category.entity";
import { CategoryModule } from "src/category/category.module";


@Module({
    imports : [TypeOrmModule.forFeature([Product,Category]), CategoryModule],
    controllers : [ProductsController],
    providers  : [ProductService]
})
export class ProductsModule {
    
}