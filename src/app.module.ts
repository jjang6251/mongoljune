import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member/entities/member.entity';

@Module({
  imports: [AuthModule, MemberModule,

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
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
