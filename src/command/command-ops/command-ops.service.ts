import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { CommandOpsEntity } from './command-ops.entity';

@Injectable()
export class CommandOpsService extends CRUDService<CommandOpsEntity> {
  constructor(
    @InjectRepository(CommandOpsEntity) repo: Repository<CommandOpsEntity>,
  ) {
    super(repo);
  }
}
