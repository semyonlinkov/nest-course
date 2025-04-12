import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) { }

    getHello(): any {
        return this.prisma.user.create({
            data: {
                name: 'pidor',
                email: 'pidor@gay.ru'
            }
        });
    }
}
