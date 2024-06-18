import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MemberModule } from 'src/member/member.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        MemberModule,
        JwtModule.register({
            global: true,
            //secret: jwtConstants.secret,
            secret: process.env['SECRET_KEY'],
            signOptions: { expiresIn: '10h' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
