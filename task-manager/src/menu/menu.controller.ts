import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { MenuService } from './menu.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
    
    constructor(private _menuService: MenuService) {}

    @UseGuards(JwtGuard)
    @Get('menus')
    getMenu() {
        return this._menuService.getMenu();
    }
}
