import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entity/images.entity';
import { Repository } from 'typeorm';
import { ImagesDto } from './dto/images.dto';

@Injectable() 
export class ImagesService {
    @InjectRepository(Images) private imageRepo: Repository<Images>

    async createImage(createImageDto: ImagesDto, @Res() res: Response) {
    try {     
        const newImage = await this.imageRepo.create( {
            imageUrl: createImageDto.imageUrl,
            productId: createImageDto.productId
        });
        return  await this.imageRepo.save(newImage);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    // Lấy ảnh cho detail

    async findImage(productId: string){
      try {
        let images = await this.imageRepo.find({where: {productId: productId}})
        return images
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
}
