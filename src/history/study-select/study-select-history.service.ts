import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { StudySelectHistoryEntity } from './study-select-history.entity';

@Injectable()
export class StudySelectHistoryService extends CRUDService<StudySelectHistoryEntity> {
  constructor(
    @InjectRepository(StudySelectHistoryEntity)
    repo: Repository<StudySelectHistoryEntity>,
  ) {
    super(repo);
  }
}
