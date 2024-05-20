import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) { }

    @Post('generate')
    async generate(@Body('prompt') prompt: string): Promise<{diary:string}> {
        return this.openaiService.generateChatResponse(prompt);
    }
}
