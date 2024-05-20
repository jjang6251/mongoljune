import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';


const addPrompt: string =
    "I'll give you the text. You can summarize this text in the form of a child's diary. He speaks like a child. The summary can be written in Korean. And don't make up things that don't exist. Emphasize. Don't make up words that don't exist. I'll give you an example. Please respond in this tone. \n";

const example: string =
    "example: 오늘 하루도 재밌었다. 또 떡볶이 먹으러 가고 싶다.";




@Injectable()
export class OpenaiService {
    private openai: OpenAI;
    private conversationState: any;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env['OPENAI_API_KEY'],
        });
        this.conversationState = null;
    }

    async generateChatResponse(prompt: string): Promise<{diary:string}> {
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            messages: [{ role: 'user', content: addPrompt + example + prompt }],
            model: 'gpt-3.5-turbo-0613',
        };

        try {
            const chatCompletion: OpenAI.Chat.ChatCompletion = await this.openai.chat.completions.create(params);
            this.conversationState = null;
            return {diary: chatCompletion.choices[0].message?.content.trim() || 'No response'};
        } catch (error) {
            console.error('Error generating chat completion:', error);
            throw error;
        }
    }

}
