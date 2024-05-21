import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity } from 'typeorm';
import { EStudyAnswerSelection } from './study-answer-history.enum';

@Entity({ name: 'lm_history_study_answer' })
export class StudyAnswerHistoryEntity extends DefaultEntity {
  @Column({ comment: '기출문제 선택내역ID (history_study_select.id)' })
  selectId: string;

  @Column({ comment: '완료한 문제ID (question.id)' })
  questionId: string;

  @Column('enum', {
    enum: EStudyAnswerSelection,
    comment: '문제를 완료한 경위',
  })
  selection: EStudyAnswerSelection;

  @Column('int', { comment: '채점 시 선택한 보기번호', nullable: true })
  selectedAnswerNumber: number | null;

  @Column('boolean', { comment: '채점 시 정답여부', nullable: true })
  correct: boolean | null;
}
