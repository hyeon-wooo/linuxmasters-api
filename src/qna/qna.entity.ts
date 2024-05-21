import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EQnaStatus } from './qna.enum';
import { UserEntity } from 'src/user/user.entity';

@Entity({ name: 'lm_qna' })
export class QnaEntity extends DefaultEntity {
  @Column('enum', {
    enum: EQnaStatus,
    comment: '상태',
    default: EQnaStatus.APPLIED,
  })
  status: EQnaStatus;

  @Column({ comment: '제목' })
  title: string;

  @Column('blob', { comment: '문의내용 본문' })
  content: string;

  @Column('blob', { comment: '답변내용', nullable: true })
  answer: string | null;

  @Column('datetime', { comment: '답변일시', nullable: true })
  answeredAt: Date | null;

  @Column({ comment: '사용자ID' })
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
