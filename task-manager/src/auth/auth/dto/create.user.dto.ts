import { ApiProperty } from "@nestjs/swagger";
import { 
    IsEmail,  
    IsNotEmpty, 
    IsString, 
    MinLength 
} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty()
    lastName: string;

}