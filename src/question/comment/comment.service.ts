import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService extends CRUDService<CommentEntity> {
  constructor(
    @InjectRepository(CommentEntity) repo: Repository<CommentEntity>,
  ) {
    super(repo);
  }
}
