import { Body, Controller, Param, Post, Put, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dto/create-order.dto';
import { Response } from "express";
import { UpdateOrdersDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService){}

    @Post()
    async createOrder(@Body() orderDto: CreateOrdersDto, @Res() res: Response){
        await this.orderService.createOrder(orderDto, res)
    }

    
    // Lấy thông tin đơn hàng
    @Put(":id")
    async updateOrder(@Param("id") orderId: string,@Body() body: UpdateOrdersDto, @Res() res: Response){
      return await this.orderService.updateOrder(orderId, body , res)
    }
}
