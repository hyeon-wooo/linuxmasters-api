import { Injectable } from '@nestjs/common';
import { StudySelectHistoryService } from './study-select/study-select-history.service';
import { StudySelectHistoryEntity } from './study-select/study-select-history.entity';
import { StudyAnswerHistoryService } from './study-answer/study-answer-history.service';
import { StudyAnswerHistoryEntity } from './study-answer/study-answer-history.entity';
import { DefaultEntity } from 'src/common/default.entity';
import { CommandHistoryService } from './command/command-history.service';

@Injectable()
export class HistoryService {
  constructor(
    private studySelectService: StudySelectHistoryService,
    private studyAnswerService: StudyAnswerHistoryService,
    private commandService: CommandHistoryService,
  ) {}

  /** 기출문제 선택 내역 저장 */
  saveStudySelect(
    payload: Omit<StudySelectHistoryEntity, keyof DefaultEntity>,
  ) {
    return this.studySelectService.create(payload);
  }

  /** 기출문제 완료 내역 저장 */
  saveStudyAnswer(
    payload: Omit<StudyAnswerHistoryEntity, keyof DefaultEntity>,
  ) {
    return this.studyAnswerService.create(payload);
  }

  /** 명령어 상세조회 내역 저장 */
  saveCommandRead(payload: { commandId: string; userId: string }) {
    return this.commandService.create(payload);
  }
}
