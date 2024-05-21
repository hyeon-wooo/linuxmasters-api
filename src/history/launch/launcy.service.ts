import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { LaunchEntity } from './launch.entity';

@Injectable()
export class LaunchService extends CRUDService<LaunchEntity> {
  constructor(@InjectRepository(LaunchEntity) repo: Repository<LaunchEntity>) {
    super(repo);
  }
}
