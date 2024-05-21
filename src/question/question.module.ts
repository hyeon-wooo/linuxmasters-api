import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import { RoundEntity } from './round/round.entity';
import { RoundService } from './round/round.service';
import { CommentEntity } from './\bcomment/comment.entity';
import { CommentService } from './\bcomment/comment.service';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, RoundEntity, CommentEntity]),
    HistoryModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService, RoundService, CommentService],
  // exports: [QuestionService, RoundService],
})
export class QuestionModule {}
