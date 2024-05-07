import { IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UpdateUserDto {
    @IsString()
    fullName: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    phone: string;
    
    @IsString()
    address: string;
    
    @IsString()
    gender: string;
    
    @IsString()
    birthDay: string;
}

export class UpdateStatusUsersDto {

    @IsNotEmpty()
    statusUser: number;

}