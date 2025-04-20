import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private roleService: RolesService) { }

    async createUser(dto: CreateUserDto) {
        await this.prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password,
                roles: {
                    create: {
                        role: {
                            connectOrCreate: {
                                where: { id: 1 },
                                create: { value: 'USER', description: 'Пользователь' }
                            }
                        }
                    }
                }
            }
        })

        return this.getUserByEmail(dto.email)
    }

    async getAllUsers() {
        return this.prisma.user.findMany({
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        })
            .then(users =>
                users.map(user => ({
                    ...user,
                    roles: user.roles.map(userRole => userRole.role),
                }))
            );
    }

    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findFirst({
            where: { email },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                }
            }
        })

        if (!user) {
            return null
        }

        return {
            ...user,
            roles: user.roles.map(userRole => userRole.role),
        };
    }
}
