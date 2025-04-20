import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async login(userDto: CreateUserDto) {
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)

        if (candidate) {
            throw new HttpException(
                'Пользователь с таким email уже существует',
                HttpStatus.BAD_REQUEST
            )
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword })

        return this.generateToken(user)
    }

    async generateToken(user) {
        const payload = { email: user.email, id: user.id, roles: user.roles }

        return {
            token: this.jwtService.sign(payload)
        }
    }
}
