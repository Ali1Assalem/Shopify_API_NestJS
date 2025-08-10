import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "src/category/entities/category.entity";
import { CategoryService } from "src/category/category.service";

@Injectable()
export class ProductService{

    constructor(
        @InjectRepository(Product)
        private readonly productRepository : Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        private readonly categoryService: CategoryService
    ){}
   
   
    async create(createProductDto : CreateProductDto){
        const category = await this.categoryService.findOne(createProductDto.categoryId);

        const newProduct = this.productRepository.create({...createProductDto , category})
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