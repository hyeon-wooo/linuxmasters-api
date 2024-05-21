import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { CommandArgsEntity } from './command-args.entity';

@Injectable()
export class CommandArgsService extends CRUDService<CommandArgsEntity> {
  constructor(
    @InjectRepository(CommandArgsEntity) repo: Repository<CommandArgsEntity>,
  ) {
    super(repo);
  }
}
