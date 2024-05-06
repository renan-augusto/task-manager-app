import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        private _prisma: PrismaService,
    ) {}

    async getTasks(userId: string) {
        try {
            const tasks = await this._prisma.task.findMany({
                where: {
                    userId: parseInt(userId)
                },
                orderBy: {
                    id: 'asc',
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    completed: true,
                    completedAt: true,
                    createdAt: true,
                    userId: true
                }
            });

            return tasks;
        } catch (err) {
            throw(err);
        }
    }

    async getById(id: string) {
        try {
            const task = await this._prisma.task.findFirst({
                where: {
                    id: parseInt(id),
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    completed: true,
                    completedAt: true,
                    userId: true
                }
            })

            return task;
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if(err.code === 'P2012') {
                    throw new ForbiddenException('Dados não informados.');
                }
            }
            throw(err)
        }
    }

    async createTask(dto: TaskDto) {
        try {
            let completedAt = this.isTaskCompleted(dto);

            const task = await this._prisma.task.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    completed: dto.completed,
                    completedAt: completedAt,
                    userId: dto.userId
                },
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                }
            });
    
            return task;
        } catch (err) {
            if(err instanceof PrismaClientKnownRequestError) {
                if(err.code === 'P2012') {
                    throw new ForbiddenException('Dados não informados.');
                }
            }

            throw err;
        }
    }

    async updateTask(dto: UpdateTaskDto) {
        try{
            let completedAt = this.isTaskCompleted(dto);
            
            
            const task = await this._prisma.task.update({
                where: { 
                    id: dto.id,
                    userId: dto.userId
                },
                data: {
                    title: dto.title,
                    description: dto.description,
                    completed: dto.completed,
                    completedAt: completedAt
                },
                select: {
                    title: true,
                    completed: true,
                }
            });
    
            return task;
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if(err.code === 'P2012') {
                    throw new ForbiddenException('Dados não informados.');
                }
            }

            throw(err);
        }

    }

    async deleteTask(id) {
        try {
            const taskId = parseInt(id);
            const task = await this._prisma.task.delete({
                where: {
                    id: taskId,
                }
            });

            if(!task) {
                throw new Error('Task não encontrada.');
            }

            return {message: 'Task deletada.'};
        } catch (err) {
            throw(err);
        }
    }

    isTaskCompleted(task: TaskDto | UpdateTaskDto) {
        let completedAt = null;
        if(task.completed == true) {
            return completedAt = new Date();
        } else  {
            return null;
        }
    }
}
