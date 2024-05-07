import { IsString, IsNotEmpty } from "class-validator";

export class CreateProductsDto {
    @IsString()
    @IsNotEmpty()
    imageProduct: string;

    @IsString()
    @IsNotEmpty()
    productName: string;
    
    @IsNotEmpty()
    price: number;
    
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    storeId: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class QuantityDto{
    @IsNotEmpty()
    quantity: number;

}

export class QuantitySoldDto{

    @IsNotEmpty()
    quantitySold: number;
}
