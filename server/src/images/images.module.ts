import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from 'src/entity/images.entity';
import { Products } from 'src/entity/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Images, Products])],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
