import { IsNotEmpty, IsString } from "class-validator";

export class ImagesDto{
    @IsString()
    @IsNotEmpty()
    imageUrl: string

    @IsString()
    @IsNotEmpty()
    productId: string
}