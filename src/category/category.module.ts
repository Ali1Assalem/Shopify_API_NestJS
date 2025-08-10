import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Product } from "src/products/entities/product.entity";


@Module({
    imports : [TypeOrmModule.forFeature([Category , Product])] 
})
export class CatgoryModule {}