import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { JwtGuard } from 'src/auth/guard';
import { TaskDto } from './dto';
import { UpdateTaskDto } from './dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

@ApiTags('task')
@Controller('task')
export class TaskController {

    constructor(private _taskService: TaskService) {}

    @UseGuards(JwtGuard)
    @Get('get-by-id')
    getTaskById(@Query('id') id: string) {
        return this._taskService.getById(id);
    }

    @UseGuards(JwtGuard)
    @Get('get-tasks')
    getTasks(@Query('userId') id: string) {
        return this._taskService.getTasks(id);
    }

    @UseGuards(JwtGuard)
    @Post('create-task')
    createTask(@Body() dto: TaskDto) {
        return this._taskService.createTask(dto);
    }

    @UseGuards(JwtGuard)
    @Put('update-task')
    updateTask(@Body() dto: UpdateTaskDto) {
        return this._taskService.updateTask(dto);
    }

    @UseGuards(JwtGuard)
    @Delete('delete-task')
    deleteTask(@Body() dto: DeleteTaskDto) {
        return this._taskService.deleteTask(dto);
    }

    @UseGuards(JwtGuard)
    @Get('tasks-chart')
    getTasksChart(@Query('userId') userId: string){
        return this._taskService.getTasksChart(userId)
    }
}
