import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
    imports: [TypeOrmModule.forFeature([Diary]), JwtModule],
    providers: [OpenaiService, AuthGuard],
    controllers: [OpenaiController],
    exports: [OpenaiService, TypeOrmModule]
})
export class OpenaiModule { }
