import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private roleService: RolesService) { }

    async createUser(dto: CreateUserDto) {
        const role = await this.roleService.getRoleByValue("USER")
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password,
                roles: {
                    create: {
                        role: {
                            connectOrCreate: {
                                where: { id: role?.id },
                                create: { value: 'USER', description: 'Пользователь' }
                            }
                        }
                    }
                }
            }

        })

        return user
    }

    async getAllUsers() {
        const users = await this.prisma.user.findMany({include: {
            roles: {}
        }});



        return users;
    }
}
