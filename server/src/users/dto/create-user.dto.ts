import { Expose } from "class-transformer";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
export class AvatarUserDto {
    @IsString()
    avatarUrl: string;

}

export class UserDto{
    @Expose()
     userId: number;
     
     @Expose()
     fullName: string;

     @Expose()
     userName: string;

     @Expose()
     avatarUrl: string;

     @Expose()
     address: string;

     @Expose()
     gender: string;

     @Expose()
     statusUser: number;

     @Expose()
     birthDay: string;

     @Expose()
     phone: string;

     @Expose()
     createdDate: string;
}
