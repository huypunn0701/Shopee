import { Body, Controller, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoresService } from './stores.service';
import {Response} from "express"
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtRolesGuard } from 'src/auth/role.guard';

@Controller('stores')
export class StoresController {
    constructor(public storesService: StoresService){}

        // Đăng ký tạo cửa hàng
        @Post()
        async createStore(@Body() body: CreateStoreDto ,@Res() res: Response){
            return await this.storesService.createStore(body, res)
        }

        // Lấy thông tin của cửa hàng
        @Get("/:id")
        async findOneStore(@Param('id') userId: string){
            return await this.storesService.findOneStore(userId)
        }

        @Get("/order/:id")
        async getAllOrder(@Param("id") storeId: string ,@Res() res: Response){
            return await this.storesService.getAllOrder(storeId, res)
        }

        // Lấy tất cả store về admin
        @UseGuards(AuthGuard,JwtRolesGuard)
        @Get("/admin/user")
        async getAllStores(){
            return await this.storesService.getAllStores()
        }

        // Cập nhật lại trạng thái store
        @Put("/status/:id")
        async updateStatus(@Param("id") storeId: string, @Body("statusStore") statusStore: number){
            return await this.storesService.updateStatus(storeId, statusStore)
        }

        // Tìm kiếm cửa hàng
        @Get("/search/stores")
        async searchStores(@Query("key") key: string){
        return await this.storesService.searchStores(key)
        }    
 }
