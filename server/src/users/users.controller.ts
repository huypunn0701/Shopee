import { Body, Controller, Post, Res, UseInterceptors, Put, Param, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AvatarUserDto, CreateUserDto, UserDto } from './dto/create-user.dto';
import {Response} from "express"
import { SerializeInterceptor } from 'src/interceptors/Serialize.interceptor';
import { UpdateStatusUsersDto, UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtRolesGuard } from 'src/auth/role.guard';

@Controller('users')
export class UsersController {
    constructor(public usersService: UsersService){}

    // Đăng ký
    @Post("/register")
    async create(@Body() body: CreateUserDto, @Res() res: Response){
        return await this.usersService.create(body, res)
    }

    // // Đăng nhập
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @Post("/login")
    // async login(@Body() body: CreateUserDto, @Res() res: Response){
    //     return await this.usersService.login(body, res)
    // }

    // Cập nhật avatar
    @Put("avatar/:id")
    async updateAvatar(@Param("id") userId: string, @Body() body: AvatarUserDto, @Res() res: Response){
      return await this.usersService.updateAvatar(userId ,body, res)
    }

    // Cập nhật thông tin người dùng
    @Put(":id")
    async updateUser(@Param("id") userId: string, @Body() body: UpdateUserDto, @Res() res: Response){
      return await this.usersService.updateUser(userId ,body, res)
    }

    // Lấy toàn bộ người dùng ở trang admin
    // @UseGuards(AuthGuard)
    @UseGuards(AuthGuard,JwtRolesGuard)
    @Get()
    async getAllUser(){
      return await this.usersService.getAllUser()
    }

    // Cập nhật lại trạng thái user
    @Put("/status/:id")
    async updateStatus(@Param("id") userId: string, @Body() status: UpdateStatusUsersDto){
      return await this.usersService.updateStatus(userId, status)
    }

    // Tìm kiếm sản phẩm
    @Get("/search/users")
    async searchUsers(@Query("key") key: string){
    return await this.usersService.searchUsers(key)
    }
}
