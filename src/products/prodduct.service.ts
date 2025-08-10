import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService{

    constructor(
        @InjectRepository(Product)
        private readonly productRepository : Repository<Product>
    ){}
   
   
    async create(createProductDto : CreateProductDto){
        const newProduct = this.productRepository.create(createProductDto)
        return this.productRepository.save(newProduct)
    }

    async findAll(
        sort?:string,
        categoryId?:number,
        productName?:string
    ){
        const queryBuilder = this.productRepository.createQueryBuilder('product')

    // Join category for filtering
    queryBuilder
      .leftJoinAndSelect('product.category', 'category')
     // .leftJoinAndSelect('product.reviews', 'reviews');

    // Filter by category if categoryId is provided
    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    // Filter by product name if productName is provided
    if (productName) {
      queryBuilder.andWhere('product.name LIKE :name', {
        name: `%${productName}%`,
      });
    }

    // Sort if sort parameter is provided
    if (sort) {
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
      const sortField = sort.replace('-', ''); // Remove the '-' for field name
      queryBuilder.orderBy(`product.${sortField}`, sortOrder);
    }

        return await queryBuilder.getMany()
    }

}