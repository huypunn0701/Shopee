import { Injectable, BadRequestException, Res } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EntityManager } from 'typeorm';
import { Users } from 'src/entity/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  JwtService: any;
  constructor(
    private entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}

  async login(createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      console.log(createUserDto);
      const existingUser = await this.entityManager.findOne(Users, {
        where: { userName: createUserDto.userName },
      });
      if (existingUser === null) {
        return res.json({
          status: 201,
          message: 'Tài khoản không tồn tại!',
        });
      } else {
        bcrypt.compare(
          createUserDto.password,
          existingUser.password,
          async (err, isMatch) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                message: err,
              });
            } else {
              if (!isMatch) {
                res.status(401).json({
                  status: 401,
                  message: 'Mật khẩu không chính xác!',
                });
              } else {
                const payload = {
                  userId: existingUser.userId,
                  userName: existingUser.userName,
                  statusUser: existingUser.statusUser,
                };
                const access_token = await this.jwtService.sign(payload);
                res.status(200).json({
                  status: 200,
                  message: 'Đăng nhập thành công!',
                  data: existingUser,
                  access_token,
                });
              }
            }
          },
        );
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
