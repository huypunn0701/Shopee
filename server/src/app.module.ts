import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './entity/users.entity';
import { StoresModule } from './stores/stores.module';
import { Stores } from './entity/stores.entity';
import { ProductsModule } from './products/products.module';
import { Products } from './entity/products.entity';
import { CartsModule } from './carts/carts.module';
import { Carts } from './entity/carts.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Reviews } from './entity/reviews.entity';
import { CategoriesModule } from './categories/categories.module';
import { Categories } from './entity/categories.entity';
import { ImagesModule } from './images/images.module';
import { Images } from './entity/images.entity';
import { OrdersModule } from './orders/orders.module';
import { Orders } from './entity/orders.entity';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { OrderDetails } from './entity/orderDetail.entity';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'huymanutd',
      database: 'shopee',
      entities: [
        Users,
        Stores,
        Products,
        Carts,
        Reviews,
        Categories,
        Images,
        Orders,
        OrderDetails,
      ],
      synchronize: true,
    }),
    UsersModule,
    StoresModule,
    ProductsModule,
    CartsModule,
    ReviewsModule,
    CategoriesModule,
    ImagesModule,
    OrdersModule,
    OrderDetailModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
