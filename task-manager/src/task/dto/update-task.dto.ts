import { IsNotEmpty } from "class-validator";
import { TaskDto } from "./task.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskDto extends TaskDto {
    @IsNotEmpty()
    @ApiProperty()
    id: number;
}