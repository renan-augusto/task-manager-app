import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(_config: ConfigService) {
        super({
            datasources:{
                db:{
                    url: _config.get('DATABASE_URL')
                }
            }
        })
    }
}
