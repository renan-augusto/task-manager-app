import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { JwtGuard } from 'src/auth/guard';
import { TaskDto } from './dto';

@ApiTags('task')
@Controller('task')
export class TaskController {

    constructor(private _taskService: TaskService) {}

    @UseGuards(JwtGuard)
    @Post('create-task')
    createTask(@Body() dto: TaskDto) {
        return this._taskService.createTask(dto);
    }

    @UseGuards(JwtGuard)
    @Put('update-task')
    updateTask() {
        
    }

    @UseGuards(JwtGuard)
    @Delete('delete-task')
    deleteTask() {
        
    }
}
