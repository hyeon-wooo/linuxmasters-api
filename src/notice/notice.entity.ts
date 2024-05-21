import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'lm_notice' })
export class NoticeEntity extends DefaultEntity {
  @Column({ comment: '제목' })
  subject: string;
  @Column('blob', { comment: '내용' })
  content: string;

  @Column({ comment: '조회수', default: 0 })
  hit: number;

  @Column('boolean', { comment: '앱에 노출할지 여부', default: true })
  isShow: boolean;
}
