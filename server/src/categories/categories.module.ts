import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entity/categories.entity';
import { Products } from 'src/entity/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Products])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
