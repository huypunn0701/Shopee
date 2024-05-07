import { Body, Controller, Post, Res, Get, Param, Put } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { Response } from "express";
import { UpdateOrdersDto } from 'src/orders/dto/update-order.dto';

@Controller('order-detail')
export class OrderDetailController {
    constructor( private orderDetailService: OrderDetailService){}
    
    @Post()
    async createOrderDetail(@Body() orderDetailDto: CreateOrderDetailDto, @Res() res: Response){
        await this.orderDetailService.createOrderDetail(orderDetailDto, res)
    }

    // Lấy thông tin đơn hàng
    @Get(":id")
    async getOrder(@Param("id") userId: string, @Res() res: Response){
      return await this.orderDetailService.getOrder(userId , res)
    }
}
