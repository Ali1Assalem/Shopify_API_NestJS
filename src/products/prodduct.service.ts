import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "src/category/entities/category.entity";
import { CategoryService } from "src/category/category.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { UpdateProductStockDto } from "./dto/update-product-stock.dto";

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

    async findOne(id:number){
        const product = await this.productRepository.findOne({
            where: {id},
            relations:['category']
        })
        if(!product){
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product
    }


    async update(
        id : number ,
        updateProductDto:UpdateProductDto
    ){
        const product = await this.findOne(id)
        if(updateProductDto.categoryId){
            const category = await this.categoryService.findOne(updateProductDto.categoryId)
            product.category = category
        }

        Object.assign(product,updateProductDto)
        return await this.productRepository.save(product)
    }

    async remove(id:number){
        const product = await this.findOne(id)
        await this.productRepository.remove(product)
        console.log(this.reduceStock(2,3))
    }

    async reduceStock(productId:number,quantiy:number){
        const product = await this.findOne(productId)
        if(product.stock < quantiy){
            throw new BadRequestException(`Not enough stock for product: ${product.name}`)
        }
        product.stock -= quantiy
        return await this.productRepository.save(product)
    }

    async updateStock(productId:number,UpdateProductStockDto:UpdateProductStockDto){
        const product = await this.findOne(productId)
        
        product.stock = UpdateProductStockDto.stock
        return await this.productRepository.save(product)
    }

    
}