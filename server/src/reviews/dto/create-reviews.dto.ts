import { IsString, IsNotEmpty } from "class-validator";

export class CreateReviewsDto {

    @IsNotEmpty()
    rate: number;

    @IsString()
    @IsNotEmpty()
    contents: string;
    
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    productId: string;
}