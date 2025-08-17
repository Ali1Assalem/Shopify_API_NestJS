import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService{
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository  :Repository<Category>,
    ){}

    async create(createCategoryDto : CreateCategoryDto){
        const newCategory = this.categoryRepository.create(createCategoryDto)
        return await this.categoryRepository.save(newCategory)
    }

    async findAll(){
        return await this.categoryRepository.find()
    }

    async findOne(id :number){
        const category = await this.categoryRepository.findOne({where : {id}})
        if(!category){
            throw new NotFoundException(`Category with ID ${id} not found`)
        }
        return category
    }
    
    async update(
        id:number,
        updateCategoryDto :UpdateCategoryDto
    ){
        const category = await this.findOne(id)
        Object.assign(category,updateCategoryDto)
        return await this.categoryRepository.save(category)
    }

    async remove(id:number){
        const category = await this.findOne(id)
        await this.categoryRepository.remove(category)
        return { message: `Category with ID ${id} deleted successfully` };
    }
}