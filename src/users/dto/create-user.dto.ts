import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'govno@kal.ru', description: 'уникальный id'})
    readonly email: string;
    @ApiProperty({example: '123456', description: 'пароль'})
    readonly password: string;
}