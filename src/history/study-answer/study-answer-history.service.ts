import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { StudyAnswerHistoryEntity } from './study-answer-history.entity';

@Injectable()
export class StudyAnswerHistoryService extends CRUDService<StudyAnswerHistoryEntity> {
  constructor(
    @InjectRepository(StudyAnswerHistoryEntity)
    repo: Repository<StudyAnswerHistoryEntity>,
  ) {
    super(repo);
  }
}
