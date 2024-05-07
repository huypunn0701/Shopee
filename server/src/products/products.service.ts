import { BadRequestException, Injectable, Param, Query, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entity/products.entity';
import { Like, Repository } from 'typeorm';
import { CreateProductsDto, QuantityDto, QuantitySoldDto } from './dto/create-product.dto';
import { Response } from "express";
import { UpdateProductsDto, UpdateStatusDto, UpdateStatusProductsDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    @InjectRepository(Products) private productRepo: Repository<Products>

    // Lấy tất cả sản phẩm
    async findAllProduct() {
      try {
        return await this.productRepo
          .createQueryBuilder('products')
          .select([
            'products.imageProduct as imageProduct',
            'products.productName as productName',
            'products.productId as productId',
            'products.price as price',
            'products.quantitySold as quantitySold',
          ])
          .innerJoin("products.stores", "store")
          .where('products.statusProduct = :status', { status: 0 })
          .andWhere("store.statusstore = :statusstore", {statusstore: 1})
          .getRawMany();
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    // Thêm mới sản phẩm
    async createProduct(createProductDto: CreateProductsDto, @Res() res: Response) {
        try {     
          const newProduct = await this.productRepo.create( {
            productName: createProductDto.productName,
            price: createProductDto.price ,
            description: createProductDto.description,
            quantity: createProductDto.quantity,
            imageProduct: createProductDto.imageProduct,
            categoryId: createProductDto.categoryId,
            storeId: createProductDto.storeId
          });
    
         let product =  await this.productRepo.save(newProduct);
         return res.status(200).json({
          status: 200, 
          message: 'success',
          product
        });
    
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }

      //   Lấy dữ liệu cửa hàng
      async getProductStore(userId: string) {
        try {
          const products = await this.productRepo
            .createQueryBuilder('products')
            .select([
              'products.productId as productId',
              'products.productName as productName',
              'products.description as description',
              'products.price as price',
              'products.quantity as quantity',
              'products.imageProduct as imageProduct',
              'products.statusProduct as statusProduct',
              'stores.statusstore as statusstore',
              'stores.storeId as storeId',
            ])
            .leftJoin('products.stores', 'stores') 
            .leftJoin('stores.user', 'user') 
            .where('user.userId = :userId', { userId })
            .getRawMany();
      
          return products;
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }

      // Update lại sản phẩm
    async updateProduct(@Param("id") productId: string, updateDto: UpdateProductsDto ){
      try {
        let find =  await this.productRepo.findOne({ where: { productId: productId } });
        // find.imageProduct = updateDto.imageProduct
        find.productName = updateDto.productName
        find.categoryId = updateDto.categoryId
        find.description = updateDto.description
        find.price = updateDto.price
        find.quantity = updateDto.quantity
        return  await this.productRepo.save(find);
       
      } catch (error) {
        throw new BadRequestException(error.message);
      } 
    }
    
      // Update lại trạng thái sản phẩm
    async updateStatusProduct(@Param("id") productId: string, updateStatusDto: UpdateStatusDto ){
      try {
        let find =  await this.productRepo.findOne({ where: { productId: productId } });
        find.statusProduct = updateStatusDto.statusProduct
        return  await this.productRepo.save(find);
       
      } catch (error) {
        throw new BadRequestException(error.message);
      } 
    }

      
    // Lấy thông tin store theo userId để so sánh ở detail
    async findOneProduct(productId: string) {
    try {
      const store = await this.productRepo
        .createQueryBuilder('products') 
        .select([
          "products.storeId as storeId",
          "stores.userId as userId"
        ])
        .leftJoinAndSelect('products.stores', 'stores') 
        .where("products.storeId = stores.storeId")
        .andWhere('products.productId = :productId', { productId })
        .getRawMany(); 

      return store;
    } catch (error) {
      throw new BadRequestException('Không tìm dữ liệu productId đã cho');
    }
    }

    // Lấy chi tiết 1 products
      async findDetailProduct(productId: string){
        try {
          let product = await this.productRepo.findOne({where: {productId: productId}})
          return product
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }

      // Update lại số lượng sản phẩm
      async updateQuantityProduct(@Param("id") productId: string, createDto: QuantityDto ){
        try {
          let find =  await this.productRepo.findOne({ where: { productId: productId } });

          find.quantity = createDto.quantity
          return  await this.productRepo.save(find);
         
        } catch (error) {
          throw new BadRequestException(error.message);
        } 
      }      

      // Update lại số lượng sản phẩm đã bán
      async updateQuantitySoldProduct(@Param("id") productId: string, quantitySold: QuantitySoldDto ){

        try {
          let find =  await this.productRepo.findOne({ where: { productId: productId } });
          find.quantitySold =  quantitySold.quantitySold
          return  await this.productRepo.save(find);
         
        } catch (error) {
          throw new BadRequestException(error.message);
        } 
      }
      
      // Hàm search sản phẩm
  async searchProducts( query: string, @Res() res: Response ) {
    try {
      const products = await this.productRepo.find({
        where: [
          { productName: Like(`%${query}%`) }, 
        ],
      });
      return res.status(200).json({
        status: 200, 
        message: 'success',
        products
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Cập nhật lại sản phẩm từ admin
  async updateStatus( statusProduct: UpdateStatusProductsDto){
    try {
      let find =  await this.productRepo.findOne({ where: { productId: statusProduct.productId, storeId: statusProduct.storeId } });
        find.statusProduct = statusProduct.statusProduct
        return  await this.productRepo.save(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Lấy tất cả sản phẩm ở admin
  async getAllProducts(){
    try {
      let products = await this.productRepo
      .createQueryBuilder("products")
      .select([
        'products.productId as productId',
        'products.productName as productName',
        'products.imageProduct as imageProduct',
        'products.statusProduct as statusProduct',
        'store.statusstore as statusstore',
        'store.storeId as storeId',
        'store.storeName as storeName',
        'user.avatarUrl as avatarUrl',
      ])
      .leftJoin("products.stores","store")
      .leftJoin("store.user", "user")
      .getRawMany()
      return products    
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

      // Hàm search sản phẩm ở admin
      async searchProductsAdmin( query: string) {
        try {
          let products = await this.productRepo
          .createQueryBuilder("products")
          .select([
            'products.productId as productId',
            'products.productName as productName',
            'products.imageProduct as imageProduct',
            'products.statusProduct as statusProduct',
            'store.statusstore as statusstore',
            'store.storeId as storeId',
            'store.storeName as storeName',
            'user.avatarUrl as avatarUrl',
          ])
          .leftJoin("products.stores","store")
          .leftJoin("store.user", "user")
          .where("products.productName LIKE :productName", { productName: `%${query}%` })
          .getRawMany()
          return products    
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }    
}
