import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entity/categories.entity';
import { Products } from 'src/entity/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    @InjectRepository(Categories) private categoryRepo: Repository<Categories>
    @InjectRepository(Products) private productRepo: Repository<Products>

    async findAll(){
        try {
           let categories = await this.categoryRepo.find()
           return categories;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // Lấy category theo productId
    async findCategory(productId: string){
        try {
            const category = await this.productRepo
            .createQueryBuilder('products') 
            .select([
              "categories.categoryName as categoryName"
            ])
            .leftJoinAndSelect('products.categories', 'categories') 
            .where("products.categoryId = categories.categoryId")
            .andWhere('products.productId = :productId', { productId })
            .getRawMany(); 
    
          return category;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // Phân loại sản phẩm
    async getCategory(categoryId: string){
        try {
            let products = await this.categoryRepo
            .createQueryBuilder("category")
            .select([
                "product.productId as productId",
                "product.productName as productName",
                "product.price as price",
                "product.imageProduct as imageProduct",
                "product.quantitySold as quantitySold",
                "category.categoryName as categoryName",
            ])
            .leftJoin("category.products", "product")
            .where("category.categoryId = :categoryId", {categoryId})
            .andWhere("product.statusProduct = 0")
            .getRawMany()
            return products
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
