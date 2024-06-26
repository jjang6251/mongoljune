import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member/entities/member.entity';
import { Diary } from './openai/entities/diary.entity';
import { OpenaiService } from './openai/openai.service';
import { OpenaiController } from './openai/openai.controller';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { DomainController } from './domain/domain.controller';
import { DataSource } from 'typeorm';
import { Comment } from './openai/entities/comment.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['DB_HOST'],
      port: 3306,
      username: process.env['DB_USER'],
      password: process.env['DB_PASSWORD'],
      database: 'mongol',
      entities: [Member, Diary, Comment],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    AuthModule, MemberModule, OpenaiModule,
  ],
  // controllers: [AppController, AuthController, OpenaiController, DomainController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
