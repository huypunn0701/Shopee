import { IsString, IsNotEmpty } from "class-validator";

export class CreateCartsDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    quantityCart: number;
}
