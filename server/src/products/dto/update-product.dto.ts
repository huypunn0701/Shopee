import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProductsDto {
    // @IsString()
    // imageProduct: string;

    @IsString()
    productName: string;
    
    @IsString()
    price: number;
    
    @IsString()
    quantity: number;

    @IsString()
    categoryId: number;

    @IsString()
    description: string;

}
export class UpdateStatusProductsDto {

    @IsNotEmpty()
    statusProduct: number;

    @IsString()
    productId: string;

    @IsString()
    storeId: string
}

export class UpdateStatusDto {

    @IsNotEmpty()
    statusProduct: number;

}
