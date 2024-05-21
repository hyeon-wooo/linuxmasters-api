import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { ScreenHistoryLogEntity } from './log-screen-history.entity';

@Injectable()
export class ScreenHistoryLogService extends CRUDService<ScreenHistoryLogEntity> {
  constructor(
    @InjectRepository(ScreenHistoryLogEntity)
    repo: Repository<ScreenHistoryLogEntity>,
  ) {
    super(repo);
  }
}
