import { IsString, IsNotEmpty } from "class-validator";

export class UpdateOrdersDto {
    @IsString()
    @IsNotEmpty()
    statusOrder: string;

}