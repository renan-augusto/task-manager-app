import { Injectable } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
    constructor(
        private _prisma: PrismaService,
    ) {}

    async getMenu(): Promise<Pick<Menu, 'label' | 'action' | 'icon'>[]> {
        try {
            const menus = await this._prisma.menu.findMany({
                select: {
                    label: true,
                    action: true,
                    icon: true
                }
            });
            return menus;
        } catch (err) {
            throw new Error(`Error retrieving menus ${err}`);
        }
    }
}
