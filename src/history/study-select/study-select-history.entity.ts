import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity } from 'typeorm';

/** 기출문제 선택 내역 */
@Entity({ name: 'lm_history_study_select' })
export class StudySelectHistoryEntity extends DefaultEntity {
  @Column({ comment: '급수' })
  className: string;

  @Column({
    comment: '선택한 회차. 무작위풀기나 상관없음일 경우 null',
    nullable: true,
  })
  roundName: string | null;

  @Column({
    comment:
      '선택한 주제들. 무작위풀기일 경우 null. 해시태그로 이어붙인 문자열',
  })
  topics: string;
}
