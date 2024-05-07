import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entity/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrdersDto } from './dto/create-order.dto';
import { Response } from "express";
import { UpdateOrdersDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    @InjectRepository(Orders) private orderRepo: Repository<Orders>

    async createOrder(orderDto: CreateOrdersDto, @Res() res: Response){
        try {
            const order = await this.orderRepo.create({
                addressOrder: orderDto.addressOrder,
                phoneOrder: orderDto.phoneOrder,
                nameOrder: orderDto.nameOrder,
                totalPrice: orderDto.totalPrice,
                userId: orderDto.userId,
                storeId: orderDto.storeId,
            })
            const newOrder = await this.orderRepo.save(order);
            return res.status(201).json({
                status: 200,
                message: "success",
                newOrder
              });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

     // Update lại trạng thái sản phẩm
     async updateOrder(orderId: string, updateStatusDto: UpdateOrdersDto, @Res() res: Response){
            try {
              let find =  await this.orderRepo.findOne({ where: { orderId: orderId } });
              find.statusOrder = updateStatusDto.statusOrder
              const updateOrder = await this.orderRepo.save(find);
              return res.status(201).json({
                status: 200,
                message: "success",
                updateOrder
              });
             
            } catch (error) {
              throw new BadRequestException(error.message);
            } 
     }    
}
