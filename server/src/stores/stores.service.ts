import { BadRequestException, Injectable, Param, Res } from '@nestjs/common';
import { EntityManager, Like, Repository } from 'typeorm';
import { Response } from 'express';
import { CreateStoreDto } from './dto/create-store.dto';
import { Stores } from 'src/entity/stores.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoresService {
    // @InjectRepository(Users) private userRepo: Repository<Users>
    @InjectRepository(Stores) private storeRepo: Repository<Stores>
  constructor(private entityManager: EntityManager) {}

  // Đăng ký cửa hàng
  async createStore(createStoreDto: CreateStoreDto, @Res() res: Response) {
    try {
      const newStore = await this.entityManager.create(Stores, {
        ...createStoreDto
      });
      await this.entityManager.save(newStore);

      return res.status(200).json({
        status: 200,
        message: 'success',
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //   Lấy dữ liệu cửa hàng
  async findOneStore(userId: string) {
    try {
      const user = await this.storeRepo
        .createQueryBuilder('stores')
        .select([
            'stores.statusstore as statusstore',
            "stores.storeId as storeId"
          ])
        .leftJoinAndSelect('stores.user', 'user') 
        .where('user.userId = :userId', { userId })
        .getRawMany();

      if (!user) {
        throw new BadRequestException('Không tìm thấy người dùng cho userId đã cho');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllOrder(storeId: string, @Res() res: Response){
    try {
      const orderStore = await this.storeRepo
      .createQueryBuilder("stores")
      .select([
        'product.productId as productId',
        'product.productName as productName',
        'product.price as price',
        'product.imageProduct as imageProduct',
        'product.statusProduct as statusProduct',
        'stores.statusstore as statusstore',
        'stores.storeId as storeId',
        'stores.storeName as storeName',
        'user.avatarUrl as avatarUrl',
        'user.userName as userName',
        'order_detail.quantityOrder as quantityOrder',
        'order_detail.priceOrder as priceOrder',
        'order.orderId as orderId',
        'order.statusOrder as statusOrder',
        'order.totalPrice as totalPrice',
        'order.phoneOrder as phoneOrder',
        'order.nameOrder as nameOrder',
        'order.createDateOrder as createDateOrder',
        'order.addressOrder as addressOrder',
      ])
      .leftJoin("stores.orders", "order")
      .leftJoin("order.orderDetail", "order_detail")
      .leftJoin("order_detail.products", "product")
      .leftJoin("order.users", "user")
      .where("stores.storeId = :storeId", {storeId})
      .getRawMany();
      return res.status(200).json({
        status: 200,
        message: "success",
        orderStore
      });
    } catch (error) {
      throw new BadRequestException(error.message);      
    }
  }

  // Lấy tất cả store về admin
  async getAllStores(){
    try {
      let stores = await this.storeRepo.find()
      return stores
    } catch (error) {
      throw new BadRequestException(error.message);     
    }
  }

  // Cập nhật lại trạng thái store
  async updateStatus(storeId: string, statusStore: number){
    try {
      let store = await this.storeRepo.findOne({where: {storeId: storeId}});
      store.statusstore = statusStore 
      let newStatus = await this.storeRepo.save(store);
      return newStatus
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }

      // Hàm search cửa hàng
      async searchStores( query: string) {
        try {
          const stores = await this.storeRepo.find({
            where: [
              { storeName: Like(`%${query}%`) }, 
            ],
          });
          return stores
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }  
}
