import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity } from 'typeorm';
import { EQuestionTopic } from './question.enum';

@Entity({ name: 'lm_question' })
export class QuestionEntity extends DefaultEntity {
  @Column({ comment: '회차 및 급수 정보' })
  roundId: string;

  @Column('int', { comment: '실제 시험에서의 문항번호 (roundId마다 1~80)' })
  no: number;

  @Column('enum', { enum: EQuestionTopic, comment: '문제의 주제' })
  topic: EQuestionTopic;

  @Column('blob', { comment: '문제 설명' })
  description: string;

  @Column('blob', { comment: '참고 지문(텍스트인 경우)', nullable: true })
  referenceText: string;

  @Column('blob', { comment: '참고 지문(사진인 경우)', nullable: true })
  referenceImg: string;

  @Column({ comment: '정답' })
  answer: number;

  @Column('varchar', {
    comment: '보기 1번',
    nullable: true,
  })
  select1: string | null;

  @Column('varchar', {
    comment: '보기 2번',
    nullable: true,
  })
  select2: string | null;

  @Column('varchar', {
    comment: '보기 3번',
    nullable: true,
  })
  select3: string | null;

  @Column('varchar', {
    comment: '보기 4번',
    nullable: true,
  })
  select4: string | null;

  @Column('varchar', {
    comment: '보기 5번',
    nullable: true,
  })
  select5: string | null;
}
