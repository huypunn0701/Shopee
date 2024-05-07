import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(public categoryService: CategoriesService){}

    @Get()
    async findAll(){
        return await this.categoryService.findAll()
    }

    // Lấy category theo productId
    @Get(":id")
    async findCategory(@Param("id") productId: string){
        return await this.categoryService.findCategory(productId)
    }

    // Phân loại sản phẩm
    @Get("/products/:id")
    async getCategory(@Param("id") categoryId: string){
        return await this.categoryService.getCategory(categoryId)
    }
}
