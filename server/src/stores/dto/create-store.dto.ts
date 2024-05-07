import { IsString, IsNotEmpty } from "class-validator";

export class CreateStoreDto {
    @IsString()
    @IsNotEmpty()
    storeName: string;

    @IsString()
    @IsNotEmpty()
    addressStore: string;
    
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    statusstore: number;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    emailStore: string;

}
