import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member/entities/member.entity';
import { OpenaiService } from './openai/openai.service';
import { OpenaiController } from './openai/openai.controller';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { DomainController } from './domain/domain.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '34.64.99.131',
      port: 3306,
      username: 'jjang',
      password: 'assaassa0319',
      database: 'nest',
      entities: [Member],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    AuthModule, MemberModule, OpenaiModule,
  ],
  controllers: [AppController, AuthController, OpenaiController, DomainController],
  providers: [AppService, AuthService, OpenaiService],
})
export class AppModule {}
