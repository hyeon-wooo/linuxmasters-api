import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/common/crud.service';
import { In, Repository } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { RoundService } from './round/round.service';
import { EQuestionTopic } from './question.enum';

@Injectable()
export class QuestionService extends CRUDService<QuestionEntity> {
  constructor(
    @InjectRepository(QuestionEntity) repo: Repository<QuestionEntity>,
    private roundService: RoundService,
  ) {
    super(repo);
  }

  /** 특정 급수에 해당하는 모든 문제의 ID */
  async getAllQidByClassName(className: string): Promise<string[]> {
    const rounds = await this.roundService.findMany({
      where: { className: className },
    });
    const roundIds = rounds.map((r) => r.id);

    const questionIds = (
      await this.findMany({
        where: { roundId: In(roundIds) },
        select: ['id'],
      })
    ).map((q) => q.id);

    return questionIds;
  }

  getAllTopics() {
    return [
      EQuestionTopic.USER,
      EQuestionTopic.FILE,
      EQuestionTopic.NETWORK,
      EQuestionTopic.ETC,
    ];
  }
}
