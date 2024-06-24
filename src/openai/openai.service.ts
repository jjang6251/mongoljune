import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { OpenAIDto } from './dto/openai.dto';
import { MyResponseDto } from './dto/myresponse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { Repository } from 'typeorm';
import { FineTuningJobCheckpointsPage } from 'openai/resources/fine-tuning/jobs/checkpoints';
import { DiaryListDto } from './dto/diarylist.dto';

const addPrompt: string =
    "\n\n이걸 읽고 어린 아이가 일기 쓰는 어투로 바꿔줘.\n";

const askTitle: string =
    "위 일기를 보고 제목을 지어줘";

const askWeather: string =
    "위 일기를 읽고 날씨를 알려줘. 대신 대답은(맑음, 비, 눈, 흐림)에서만 골라서 대답해줘. 대답 예시를 보여줄게 괄호 안에 처럼 대답하면 돼: (맑음)";

@Injectable()
export class OpenaiService {
    private openai: OpenAI;
    private conversationState: any;

    constructor(@InjectRepository(Diary) private diaryRepository: Repository<Diary>) {
        this.openai = new OpenAI({
            apiKey: process.env['OPENAI_API_KEY'],
        });
        this.conversationState = null;
    }

    async generateChatResponse(user, openaidto: OpenAIDto): Promise<MyResponseDto> {
        let myresponse: MyResponseDto = {};

        // 첫번째 질문: prompt를 일기 형식으로 요약해줘
        const firstparams: OpenAI.Chat.ChatCompletionCreateParams = {
            messages: [{ role: 'user', content: openaidto.prompt + addPrompt }],
            model: 'gpt-3.5-turbo-0613',
        };

        try {
            const chatCompletion: OpenAI.Chat.ChatCompletion = await this.openai.chat.completions.create(firstparams);
            const response = chatCompletion.choices[0].message?.content.trim() || 'No response';
            myresponse.content = response;
        } catch (error) {
            console.error('Error generating chat completion:', error);
            throw error;
        }

        // 두번째 질문: 이 글의 title을 알려줘
        const secondparams: OpenAI.Chat.ChatCompletionCreateParams = {
            messages: [{ role: 'user', content: openaidto.prompt + askTitle }],
            model: 'gpt-3.5-turbo-0613',
        };

        try {
            const chatCompletion: OpenAI.Chat.ChatCompletion = await this.openai.chat.completions.create(secondparams);
            const response = chatCompletion.choices[0].message?.content.trim() || 'No response';
            myresponse.title = response;
        } catch (error) {
            console.error('Error generating chat completion:', error);
            throw error;
        }

        // 세번째 질문: 이 글의 날씨를 알려줘(맑음, 흐림, 비, 눈)
        const thirdparams: OpenAI.Chat.ChatCompletionCreateParams = {
            messages: [{ role: 'user', content: openaidto.prompt + askWeather }],
            model: 'gpt-3.5-turbo-0613',
        };

        try {
            const chatCompletion: OpenAI.Chat.ChatCompletion = await this.openai.chat.completions.create(thirdparams);
            const response = chatCompletion.choices[0].message?.content.trim() || 'No response';
            myresponse.weather = response;
        } catch (error) {
            console.error('Error generating chat completion:', error);
            throw error;
        }
        myresponse.auth = user.name;
        myresponse.date = openaidto.date;
        myresponse.auth_id = user.userid;
        try {
            const newDiary = this.diaryRepository.create(myresponse);
            await this.diaryRepository.save(newDiary);
        } catch (error) {
            throw new HttpException('회원 저장에 실패했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        this.conversationState = null;
        return myresponse;
    }

    async getDiaryList(user) {
        return await this.diaryRepository.find({ where: { auth_id: user.auth_id } })
    }
}
