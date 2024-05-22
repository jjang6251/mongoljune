import { Controller, Get, HttpCode, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('domain')
export class DomainController {
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Get('/logincheck')
    getLogin(@Request() req) {
        return req.user;
    }

}
