import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth/auth.module';
import { PrismaModule } from './prisma/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthModule,
  PrismaModule,
],
})
export class AppModule {}
