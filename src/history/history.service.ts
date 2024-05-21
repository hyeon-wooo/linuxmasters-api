import { Injectable } from '@nestjs/common';
import { StudySelectHistoryService } from './study-select/study-select-history.service';
import { StudySelectHistoryEntity } from './study-select/study-select-history.entity';
import { StudyAnswerHistoryService } from './study-answer/study-answer-history.service';
import { StudyAnswerHistoryEntity } from './study-answer/study-answer-history.entity';
import { DefaultEntity } from 'src/common/default.entity';
import { CommandHistoryService } from './command/command-history.service';
import { TLaunchInfo } from 'src/common/launch.decorator';
import { SaveLaunchDTO } from './history.dto';
import { LaunchService } from './launch/launcy.service';
import { ScreenHistoryLogService } from './screen-history/log-screen-history.service';

@Injectable()
export class HistoryService {
  constructor(
    private studySelectService: StudySelectHistoryService,
    private studyAnswerService: StudyAnswerHistoryService,
    private commandService: CommandHistoryService,
    private launchService: LaunchService,
    private screenService: ScreenHistoryLogService,
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
  saveCommandRead(payload: {
    commandId: string;
    userId: string;
    launchId: string;
  }) {
    return this.commandService.create(payload);
  }

  /** 앱실행내역 저장 */
  saveLaunch(launch: TLaunchInfo, device: SaveLaunchDTO, userId?: string) {
    const { launchId, launchTimeISO, deviceId } = launch;

    const [os, osVersion] = device.os.split(':');

    this.launchService.create({
      id: launchId,
      launchedAt: new Date(launchTimeISO),
      deviceId,
      deviceName: device.deviceName,
      os: os === 'android' ? 'a' : 'i',
      osVersion,
      appVersion: device.version,
      userId,
    });
  }

  /** 화면진입내역 저장 */
  saveScreenHistory(userId: string, screenName: string, launch: TLaunchInfo) {
    if (!launch) return false;

    return this.screenService.create({
      userId,
      screenName,
      launchId: launch.launchId,
      enteredAt: new Date(launch.launchTimeISO),
    });
  }
}
