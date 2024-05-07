import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';

@Module({
  imports: [TypeOrmModule.forFeature([Users,
  ]),  JwtModule.register({ 
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
