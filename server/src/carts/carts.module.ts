import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from 'src/entity/carts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carts])],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
