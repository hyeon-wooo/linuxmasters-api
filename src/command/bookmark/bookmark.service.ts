import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { CommandBookmarkEntity } from './bookmark.entity';

@Injectable()
export class CommandBookmarkService extends CRUDService<CommandBookmarkEntity> {
  constructor(
    @InjectRepository(CommandBookmarkEntity)
    repo: Repository<CommandBookmarkEntity>,
  ) {
    super(repo);
  }
}
