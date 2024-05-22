import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtPassGuard } from 'src/auth/jwt.guard';
import { LaunchID, TLaunchInfo } from 'src/common/launch.decorator';
import { SaveLaunchDTO, SaveScreenHistoryDTO } from './history.dto';
import { Request } from 'express';

@Controller('history')
export class HistoryController {
  constructor(private service: HistoryService) {}

  @Post('screen')
  @UseGuards(JwtPassGuard)
  async screen(
    @Body() body: SaveScreenHistoryDTO,
    @Req() { user }: Request,
    @LaunchID() launch: TLaunchInfo,
  ) {
    const { screenName, deviceName, os, version } = body;

    // 앱 실행내역 저장
    if (screenName === 'Splash') {
      if (deviceName && os && version)
        this.service.saveLaunch(launch, { deviceName, os, version }, user?.id);
    }

    // 화면 진입내역 저장
    this.service.saveScreenHistory(user?.id ?? 'unknown', screenName, launch);

    return true;
  }
}
