import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entity/products.entity';
import { Categories } from 'src/entity/categories.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories]),  JwtModule.register({ 
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
