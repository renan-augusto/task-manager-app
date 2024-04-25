import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [TaskController],
  providers: [TaskService, JwtStrategy]
})
export class TaskModule {}
