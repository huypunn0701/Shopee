import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from 'src/entity/carts.entity';
import { Repository } from 'typeorm';
import { CreateCartsDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
    @InjectRepository(Carts) private cartRepo: Repository<Carts>

    async createCart(cartDto: CreateCartsDto){
        try {
            const findCart = await this.cartRepo.findOne({
                where: { userId: cartDto.userId, productId: cartDto.productId }
            });
    
            if (findCart) {
                findCart.quantityCart = findCart.quantityCart + cartDto.quantityCart;
                await this.cartRepo.save(findCart);
                return findCart;
            } else {
                const cart = this.cartRepo.create({
                    userId: cartDto.userId,
                    productId: cartDto.productId,
                    quantityCart: cartDto.quantityCart
                });
                const newCart = await this.cartRepo.save(cart);
                return newCart;
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    
    // Lấy mỗi user 1 giỏ hàng
    async getCart(userId: string){
        try {
            const carts = await this.cartRepo
            .createQueryBuilder("carts")
            .select([
              'products.productId as productId',
              'products.productName as productName',
              'products.description as description',
              'products.price as price',
              'products.quantity as quantity',
              'products.quantitySold as quantitySold',
              'products.imageProduct as imageProduct',
              'products.statusProduct as statusProduct',
              'stores.statusstore as statusstore',
              'stores.storeId as storeId',
              'stores.storeName as storeName',
              'carts.quantityCart as quantityCart'
            ])
            .leftJoin("carts.product", "products")
            .leftJoin("products.stores", "stores")
            .where("carts.userId = :userId", {userId})
            .andWhere("products.statusProduct = 0")
            .andWhere("stores.statusstore = 1")
            .getRawMany();
            return carts
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // Xóa sản phẩm
    async deleteProduct(userId: string, productId: string){
      try {
        const findProductCart = await this.cartRepo.findOne({
            where: { userId: userId, productId: productId }
        });
        if(!findProductCart || findProductCart === null){
            throw new BadRequestException('Không tìm thấy dữ liệu cart');
        }
        return await this.cartRepo.remove(findProductCart)
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    async deleteAllProduct(userId: string){
        try {
          const findProductCart = await this.cartRepo.find({
              where: { userId: userId }
          });
          if(!findProductCart || findProductCart === null){
              throw new BadRequestException('Không tìm thấy dữ liệu cart');
          }
          return await this.cartRepo.remove(findProductCart)
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }
}
