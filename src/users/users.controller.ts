import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: CreateUserDto})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }


    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [CreateUserDto]})
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
}
