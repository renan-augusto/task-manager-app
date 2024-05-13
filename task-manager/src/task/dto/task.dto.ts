import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class TaskDto {
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsBoolean()
    @ApiProperty()
    completed: boolean;

    @IsNotEmpty()
    @ApiProperty()
    userId: string;
}