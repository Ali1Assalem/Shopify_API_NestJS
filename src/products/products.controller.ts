import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./prodduct.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { UpdateProductStockDto } from "./dto/update-product-stock.dto";

@Controller('product')
export class ProductsController {

    constructor(
        private readonly productService : ProductService
    ){}
    
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Get()
    findAll(
        @Query('sort') sort? : string , 
        @Query('categoryId') categoryId? : number,
        @Query('productName') productName? : string)
    {
        return this.productService.findAll(sort,categoryId,productName)
    }

    @Patch(':id')
    update(@Param('id') id : number , @Body() updateProductDto:UpdateProductDto){
        return this.productService.update(id,updateProductDto)
    }
 
    @Patch(':id/stock')
    updateStock(@Param('id') id : number , @Body() updateProductStockDto:UpdateProductStockDto){
        return this.productService.updateStock(id,updateProductStockDto)
    }

    @Delete(':id')
    remove(@Param('id') id : number){
        return this.productService.remove(id)
    }


    
}