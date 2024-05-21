import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { CommandExampleEntity } from './command-example.entity';

@Injectable()
export class CommandExampleService extends CRUDService<CommandExampleEntity> {
  constructor(
    @InjectRepository(CommandExampleEntity)
    repo: Repository<CommandExampleEntity>,
  ) {
    super(repo);
  }
}
