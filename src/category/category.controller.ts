import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryService } from "./category.service";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Post()
    async create(@Body() createCategoryDto : CreateCategoryDto){
        return await this.categoryService.create(createCategoryDto)
    }

    @Get()
    async findAll(){
        return await this.categoryService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id:number){
        return await this.categoryService.findOne(id)
    }

    @Patch(':id')
    async update(
        @Param('id') id : number , 
        @Body() updateCategoryDto : UpdateCategoryDto
    ){
        return await this.categoryService.update(id, updateCategoryDto)
    }


    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.categoryService.remove(id);
    }    
}