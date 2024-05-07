import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from 'src/entity/reviews.entity';
import { Users } from 'src/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews, Users])],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
