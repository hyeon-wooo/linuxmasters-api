import { Global, Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudySelectHistoryEntity } from './study-select/study-select-history.entity';
import { StudySelectHistoryService } from './study-select/study-select-history.service';
import { StudyAnswerHistoryEntity } from './study-answer/study-answer-history.entity';
import { StudyAnswerHistoryService } from './study-answer/study-answer-history.service';
import { CommandHistoryService } from './command/command-history.service';
import { CommandHistoryEntity } from './command/command-history.entity';
import { LaunchEntity } from './launch/launch.entity';
import { ScreenHistoryLogEntity } from './screen-history/log-screen-history.entity';
import { LaunchService } from './launch/launcy.service';
import { ScreenHistoryLogService } from './screen-history/log-screen-history.service';

const services = [
  HistoryService,
  StudySelectHistoryService,
  StudyAnswerHistoryService,
  CommandHistoryService,
  LaunchService,
  ScreenHistoryLogService,
];
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudySelectHistoryEntity,
      StudyAnswerHistoryEntity,
      CommandHistoryEntity,
      LaunchEntity,
      ScreenHistoryLogEntity,
    ]),
  ],
  controllers: [HistoryController],
  providers: services,
  exports: [HistoryService],
})
export class HistoryModule {}
