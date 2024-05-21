import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'lm_comment' })
export class CommentEntity extends DefaultEntity {
  @Column({ comment: '해설을 남긴 사용자ID (user.id)' })
  userId: string;

  @Column({ comment: '문제ID (question.id)' })
  questionId: string;

  @Column('blob', { comment: '해설 내용' })
  description: string;

  @Column({
    comment: '관련 키워드. 각 키워드 앞에 해시태그를 붙여 하나로 이은 문자열.',
  })
  keywords: string;

  @Column('boolean', {
    comment: '기본해설 여부 (문제당 1개로, 관리자가 입력한 해설만 true)',
    default: false,
  })
  isDefault: boolean;
}
