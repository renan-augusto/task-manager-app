import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MenuModule } from './menu/menu.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthModule,
  PrismaModule,
  MenuModule,
  TaskModule,
],
})
export class AppModule {}
