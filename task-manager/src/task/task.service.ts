import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class TaskService {
    constructor(
        private _prisma: PrismaService,
    ) {}

    async createTask(dto: TaskDto) {
        try {
            let completedAt = null;
            if(dto.completed == true) {
                completedAt = new Date();
            }

            const task = await this._prisma.task.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    completed: dto.completed,
                    completedAt: completedAt,
                    userId: dto.userId
                },
                select: {
                    title: true,
                    createdAt: true,
                }
            });
    
            return task;
        } catch (err) {
            if(err instanceof PrismaClientKnownRequestError) {
                if(err.code === 'P2012') {
                    throw new ForbiddenException('Missing data');
                }
            }

            throw err;
        }
    }
}
