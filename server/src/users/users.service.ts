import { BadRequestException, Injectable, Param, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/users.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { AvatarUserDto, CreateUserDto } from './dto/create-user.dto';
import { Response } from "express";
import * as bcrypt from 'bcrypt';
import { UpdateStatusUsersDto, UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private entityManager: EntityManager) { }
  @InjectRepository(Users) private userRepo: Repository<Users>

  // Đăng Ký
  async create(createUserDto: CreateUserDto, @Res() res: Response) {
    try {   
      const existingUser = await this.entityManager.findOne(Users, { where: { userName: createUserDto.userName } });
      if (existingUser) {
        return res.json({
          status: 201,
          message: "Tên đăng nhập đã đăng ký!"
        });
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const newUser = await this.entityManager.create(Users, {
        userName: createUserDto.userName,
        password: hashedPassword 
      });

      await this.entityManager.save(newUser);

      return res.status(200).json({
        message: "success"
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

    // Đăng nhập
    // async login(createUserDto: CreateUserDto, @Res() res: Response){
    //   try {
    //     const existingUser = await this.entityManager.findOne(Users, { where: { userName: createUserDto.userName } });
    //     if(existingUser=== null){
    //       return res.json({
    //         status: 201,
    //         message: "Tài khoản không tồn tại!"
    //       });
    //     }else{
    //       bcrypt.compare(createUserDto.password, existingUser.password, (err, isMatch) => {
    //         if (err) {
    //           return res.status(500).json({
    //             status: 500,
    //             message: err,
    //           });
    //         }else {
    //           if (!isMatch) {
    //             res.status(401).json({
    //               status: 401,
    //               message: "Mật khẩu không chính xác!",
    //             });
    //           } else {
    //             res.status(200).json({
    //               status: 200,
    //               message: "Đăng nhập thành công!",
    //               data: existingUser,
    //             });
    //           }
    //         }
    //       })
    //     }
    //   } catch (error) {
    //     throw new BadRequestException(error.message);
    //   }
    // }

    // Cập nhật avatar
    async updateAvatar(@Param("id") userId: string, avatarDto: AvatarUserDto, @Res() res: Response ){
      const  {avatarUrl} = avatarDto
      try {
        let find =  await this.entityManager.findOne(Users, { where: { userId: userId } });
        find.avatarUrl = avatarUrl
        await this.entityManager.save(find);
        return res.status(200).json({
          status: 200,
          message: "success"
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      } 
    }

    // Cập nhật thông tin người dùng
    async updateUser(@Param("id") userId: string, updateDto: UpdateUserDto, @Res() res: Response ){
      try {
        let find =  await this.entityManager.findOne(Users, { where: { userId: userId } });
        find.fullName = updateDto.fullName
        find.phone = updateDto.phone
        find.email = updateDto.email
        find.address = updateDto.address
        find.gender = updateDto.gender
        find.birthDay = updateDto.birthDay

        await this.entityManager.save(find);
        return res.status(200).json({
          status: 200,
          message: "success"
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      } 
    }


    // Lấy toàn bộ người dùng ở trang admin
    async getAllUser(){
      try {
        let users = await this.userRepo.find()
        return users
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    // Cập nhật lại trạng thái user
    async updateStatus(userId: string, status: UpdateStatusUsersDto){
      try {
        const statusUser = await this.userRepo.findOne({where:{userId: userId}})
        statusUser.statusUser = status.statusUser
        return await this.userRepo.save(statusUser)
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

      // Hàm search sản phẩm
      async searchUsers( query: string) {
        try {
          const users = await this.userRepo.find({
            where: [
              { userName: Like(`%${query}%`) }, 
            ],
          });
          return users
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }    
}
