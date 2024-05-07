import { BadRequestException, Injectable, Param, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entity/orderDetail.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { Response } from 'express';

@Injectable()
export class OrderDetailService {
  @InjectRepository(OrderDetails)
  private orderDetailRepo: Repository<OrderDetails>;

  async createOrderDetail(
    orderDetailDto: CreateOrderDetailDto,
    @Res() res: Response,
  ) {
    try {
      const orderDetail = await this.orderDetailRepo.create({
        quantityOrder: orderDetailDto.quantityOrder,
        priceOrder: orderDetailDto.priceOrder,
        orderId: orderDetailDto.orderId,
        productId: orderDetailDto.productId,
      });
      const newOrder = await this.orderDetailRepo.save(orderDetail);
      return res.status(201).json({
        status: 200,
        message: 'success',
        newOrder,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Lấy thông tin đơn hàng
  async getOrder(userId: string, @Res() res: Response) {
    try {
      const orderUser = await this.orderDetailRepo
        .createQueryBuilder('order_details')
        .select([
          'product.productId as productId',
          'product.productName as productName',
          'product.price as price',
          'product.imageProduct as imageProduct',
          'product.statusProduct as statusProduct',
          'stores.statusstore as statusstore',
          'stores.storeId as storeId',
          'stores.storeName as storeName',
          'users.avatarUrl as avatarUrl',
          'order_details.quantityOrder as quantityOrder',
          'order_details.priceOrder as priceOrder',
          'order.orderId as orderId',
          'order.statusOrder as statusOrder',
          'order.totalPrice as totalPrice',
        ])
        .leftJoin('order_details.products', 'product')
        .leftJoin('order_details.orders', 'order')
        .leftJoin('order.stores', 'stores')
        .leftJoin('order.users', 'users')
        .where('users.userId = :userId', { userId })
        .getRawMany();
      return res.status(200).json({
        status: 200,
        message: 'success',
        orderUser,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
