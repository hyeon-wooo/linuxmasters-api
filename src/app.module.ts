import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/db';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DBConfigService,
    }),
    UserModule,
    QuestionModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
