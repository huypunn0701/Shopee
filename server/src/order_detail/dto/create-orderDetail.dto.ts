import { IsString, IsNotEmpty } from "class-validator";

export class CreateOrderDetailDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    orderId: string;

    @IsNotEmpty()
    quantityOrder: number;

    @IsNotEmpty()
    priceOrder: number;
}