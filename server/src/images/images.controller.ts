import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesDto } from './dto/images.dto';
 
@Controller('images')
export class ImagesController {
    constructor( private imagesService: ImagesService){}

    @Post()
    async createProduct(@Body() body: ImagesDto ,@Res() res: Response){
    return await this.imagesService.createImage(body, res)
    } 

    // Lấy ảnhcho bảng detail
     @Get("/:id")
     async findImage(@Param('id') productId: string){
     return await this.imagesService.findImage(productId)
     } 
}
