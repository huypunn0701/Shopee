import { Controller, Body, Post, Res, Param, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto, QuantityDto, QuantitySoldDto } from './dto/create-product.dto';
import { Response } from "express";
import { UpdateProductsDto, UpdateStatusDto, UpdateStatusProductsDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtRolesGuard } from 'src/auth/role.guard';
 
@Controller('products') 
export class ProductsController {
    constructor(private productService: ProductsService){ }

        // Lất tất cả sản phẩm
        @Get()
        async findAllProduct(){
            return await this.productService.findAllProduct()
        }

        // Tạo sản phẩm mới
        @Post()
        async createProduct(@Body() body: CreateProductsDto ,@Res() res: Response){
        return await this.productService.createProduct(body, res)
        }
        
        // Lấy tất cả sản phẩm của 1 cửa hàng
        @Get("/:id")
        async getProductStore(@Param('id') userId: string){
        return await this.productService.getProductStore(userId)
        }

        // update lại sản phẩm
        @Put("/:id")
        async updateProduct(@Param('id') productId: string, @Body() body: UpdateProductsDto){
        return await this.productService.updateProduct(productId, body)
        }

        // Cập nhật lại trạng thái sản phẩm
        @Put("/status/:id")
        async updateStatusProduct(@Param('id') productId: string,@Body() body: UpdateStatusDto){
        return await this.productService.updateStatusProduct(productId, body)
        }

         // Lấy thông tin store theo userId để so sánh ở detail
        @Get("/storeId/:id")
        async findOneProduct(@Param('id') productId: string){
        return await this.productService.findOneProduct(productId)
        }

        // Lấy chi tiết 1 products
        @Get("/detail/:id")
        async findDetailProduct(@Param('id') productId: string){
        return await this.productService.findDetailProduct(productId)
        }

        // Cập nhật lại số lượng sản phẩm
        @Put("/quantity/:id")
        async updateQuantityProduct(@Param('id') productId: string,@Body() body: QuantityDto){
           
        return await this.productService.updateQuantityProduct(productId, body)
        }

        // Cập nhật lại số lượng sản phẩm đã bán
        @Put("/quantitySold/:id")
        async updateQuantitySoldProduct(@Param('id') productId: string,@Body() quantitySold: QuantitySoldDto){
        return await this.productService.updateQuantitySoldProduct(productId, quantitySold)
        }

        // Tìm kiếm sản phẩm
        @Get("/search/find")
        async searchProducts(@Query("key") key: string, @Res() res: Response){
        return await this.productService.searchProducts(key, res)
        }

        // Cập nhật lại sản phẩm từ admin
        @Put("/status/admin/lock")
        async updateStatus(@Body() body: UpdateStatusProductsDto){
            return await this.productService.updateStatus( body)
        }

        // Lấy tất cả sản phẩm ở admin
        @UseGuards(AuthGuard,JwtRolesGuard)
        @Get("/get/admin")
        async getAllProducts(){
            return await this.productService.getAllProducts()
        }

         // Tìm kiếm sản phẩm ở admin
        @Get("/search/products")
        async searchProductsAdmin(@Query("key") key: string){
        return await this.productService.searchProductsAdmin(key)
        }  
}
