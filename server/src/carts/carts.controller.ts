import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartsDto } from './dto/create-cart.dto';

@Controller('carts')
export class CartsController {
    constructor(private cartService: CartsService){}

    // Thêm mới giỏ hàng
    @Post()
    async createCart(@Body() cartDto: CreateCartsDto){
        return await this.cartService.createCart(cartDto)
    }

    // Lấy mỗi user 1 giỏ hàng
    @Get(":id")
    async getCart(@Param("id") userId: string){
        return await this.cartService.getCart(userId)
    }

    // Xóa sản phẩm trong giỏ hàng
    @Delete(":userid/:productId")
    async deleteProduct(@Param("userid") userId: string, @Param("productId") productId: string){
        return await this.cartService.deleteProduct(userId, productId)
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    @Delete(":userId")
    async deleteAllProduct(@Param("userId") userId: string){
        return await this.cartService.deleteAllProduct(userId)
    }


}
