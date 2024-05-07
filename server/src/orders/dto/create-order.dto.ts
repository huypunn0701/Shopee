import { IsString, IsNotEmpty } from "class-validator";

export class CreateOrdersDto {
    @IsString()
    @IsNotEmpty()
    addressOrder: string;

    @IsString()
    @IsNotEmpty()
    nameOrder: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    storeId: string;

    @IsNotEmpty()
    phoneOrder: string;

    @IsNotEmpty()
    totalPrice: number;
}