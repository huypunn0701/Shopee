import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from 'src/entity/reviews.entity';
import { Users } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { CreateReviewsDto } from './dto/create-reviews.dto';

@Injectable()
export class ReviewsService {
    @InjectRepository(Reviews) private reviewRepo: Repository<Reviews>
    @InjectRepository(Users) private userRepo: Repository<Users>

    // Lấy trạng thái order về để bình luận
    async getStatusOrder(userId: string, productId: string){
        try {
            const statusOrder = await this.userRepo
            .createQueryBuilder("users")
            .select([
                "order.statusOrder as statusOrder"
            ])
            .leftJoin("users.orders", "order")
            .leftJoin("order.orderDetail", "orderDetail")
            .leftJoin("orderDetail.products", "product")
            .where('product.productId = :productId', { productId })
            .andWhere('users.userId = :userId', { userId })
            .getRawMany();

            return statusOrder;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // Thêm mới đánh giá
    async createReview(createReview: CreateReviewsDto){
        try {
            const review = await this.reviewRepo.create({
                rate: createReview.rate,
                content: createReview.contents,
                userId: createReview.userId,
                productId: createReview.productId
            })

            const newReview = await this.reviewRepo.save(review)
            return newReview
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // Lấy toàn bộ reviews
    async getReviews(productId: string){
        try {
            const allReview = await this.reviewRepo
            .createQueryBuilder("reviews")
            .select([
                "reviews.rate as rate",
                "reviews.content as content",
                "reviews.createDate as createDate",
                "user.avatarUrl as avatarUrl",
                "user.userName as userName",
            ])
            .leftJoin("reviews.user", "user")
            .leftJoin("reviews.products", "product")
            .where('product.productId = :productId', { productId })
            .getRawMany()
            return allReview
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
