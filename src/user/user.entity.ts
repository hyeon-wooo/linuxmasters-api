import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'lm_users' })
export class UserEntity extends DefaultEntity {
  @Column('varchar', { nullable: true })
  name: string | null;
  @Column('varchar', { nullable: true })
  email: string;

  @Column({ comment: 'isp 종류' })
  isp: string;

  @Column({ comment: 'isp에서 제공한 회원식별번호' })
  ispId: string;

  @Column('varchar', { comment: '프로필사진 url', nullable: true })
  profileUrl: string | null;

  @Column('datetime', {
    comment: '마지막 접속일시',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastLoginAt: Date;
}
