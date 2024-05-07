import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewsDto } from './dto/create-reviews.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(private reviewService: ReviewsService){}

        // Lấy trạng thái order về để bình luận
        @Get(":userId/:productId")
        async getStatusOrder(@Param("userId") userId: string, @Param("productId") productId: string){
        return await this.reviewService.getStatusOrder(userId, productId)
         }

         // Thêm mới đánh giá
         @Post()
         async createReview(@Body() body: CreateReviewsDto){
            return await this.reviewService.createReview(body)
         }

         // Lấy tất cả comments về
         @Get(":id")
         async getReviews(@Param("id") productId: string){
            return await this.reviewService.getReviews(productId)
         }

}
