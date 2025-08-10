import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./prodduct.service";

@Controller('product')
export class ProductsController {

    constructor(
        private readonly productService : ProductService
    ){}
    
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    async getProducts(
        @Query('sort') sort? : string , 
        @Query('categoryId') categoryId? : number,
        @Query('productName') productName? : string)
    {
        return this.productService.findAll(sort,categoryId,productName)
    }

}