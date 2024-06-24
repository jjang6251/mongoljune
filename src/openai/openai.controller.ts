import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenAIDto } from './dto/openai.dto';
import { MyResponseDto } from './dto/myresponse.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) { }

    @UseGuards(AuthGuard)
    @Post('generate')
    async generate(@Request() req, @Body() openaidto:OpenAIDto): Promise<MyResponseDto> {
        return this.openaiService.generateChatResponse(req.user, openaidto);
    }
    
    @UseGuards(AuthGuard)
    @Get('diarylist')
    async getList(@Request() req) {
        return this.openaiService.getDiaryList(req.user);
    }
}
