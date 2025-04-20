import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        RolesModule
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }
