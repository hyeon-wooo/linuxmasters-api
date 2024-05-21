import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { RoundEntity } from './round.entity';

@Injectable()
export class RoundService extends CRUDService<RoundEntity> {
  constructor(@InjectRepository(RoundEntity) repo: Repository<RoundEntity>) {
    super(repo);
  }
}
