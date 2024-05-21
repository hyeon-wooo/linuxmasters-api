import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { CommandHistoryEntity } from './command-history.entity';

@Injectable()
export class CommandHistoryService extends CRUDService<CommandHistoryEntity> {
  constructor(
    @InjectRepository(CommandHistoryEntity)
    repo: Repository<CommandHistoryEntity>,
  ) {
    super(repo);
  }
}
