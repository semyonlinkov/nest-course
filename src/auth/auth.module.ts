import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'semeneater',
        signOptions: {
            expiresIn: '24h'
        }
    }),

  ]
})
export class AuthModule {}
