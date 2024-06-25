import { Body, Controller, Post, UseGuards, Request, Get, Param, HttpCode } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenAIDto } from './dto/openai.dto';
import { MyResponseDto } from './dto/myresponse.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentDto } from './dto/comment.dto';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) { }

    @UseGuards(AuthGuard)
    @Post('generate')
    async generate(@Request() req, @Body() openaidto: OpenAIDto): Promise<MyResponseDto> {
        return this.openaiService.generateChatResponse(req.user, openaidto);
    }

    @UseGuards(AuthGuard)
    @Get('diarylist')
    async getList(@Request() req) {
        return this.openaiService.getDiaryList(req.user);
    }

    @UseGuards(AuthGuard)
    @Get('/diary/:id')
    async getDiary(@Request() req, @Param('id') id: string) {
        return this.openaiService.getDiary(req.user, id);
    }

    @UseGuards(AuthGuard)
    @HttpCode(201)
    @Post('/diary/comment/:id')
    async comment(@Request() req, @Param('id') id: string, @Body() commentDto: CommentDto) {
        await this.openaiService.writeComment(req.user, id, commentDto);
    }

    @UseGuards(AuthGuard)
    @Get('/diary/getcomment/:id')
    async getComment(@Request() req, @Param('id') id: string) {
        return await this.openaiService.getComment(req.user, id);
    }
}
