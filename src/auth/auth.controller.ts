import { Body, Controller, Header, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/logindto.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() loginDto: LoginDto, @Res() res: Response) {
        const signInResult = await this.authService.signIn(loginDto);
        const access_token = signInResult.access_token;

        // 헤더를 설정하고 응답을 보냅니다.
        res.setHeader('access_token', access_token);
        return res.status(HttpStatus.OK).end();
    }

}
