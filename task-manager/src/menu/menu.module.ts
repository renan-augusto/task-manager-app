import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [MenuController],
  providers: [MenuService, JwtStrategy]
})
export class MenuModule {}
