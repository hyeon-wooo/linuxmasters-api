import { Global, Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudySelectHistoryEntity } from './study-select/study-select-history.entity';
import { StudySelectHistoryService } from './study-select/study-select-history.service';
import { StudyAnswerHistoryEntity } from './study-answer/study-answer-history.entity';
import { StudyAnswerHistoryService } from './study-answer/study-answer-history.service';

const services = [
  HistoryService,
  StudySelectHistoryService,
  StudyAnswerHistoryService,
];
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudySelectHistoryEntity,
      StudyAnswerHistoryEntity,
    ]),
  ],
  controllers: [HistoryController],
  providers: services,
  exports: [HistoryService],
})
export class HistoryModule {}
