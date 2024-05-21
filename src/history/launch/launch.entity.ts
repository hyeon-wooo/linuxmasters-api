import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'lm_launch' })
export class LaunchEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('datetime', { comment: '실행시점 (앱에서 계산한 시간)' })
  launchedAt: Date;

  @Column({ comment: '기기 고유 ID' })
  deviceId: string;

  @Column({ comment: '기기이름' })
  deviceName: string;

  @Column({ comment: 'OS종류' })
  os: string;

  @Column({ comment: 'OS버전' })
  osVersion: string;

  @Column({ comment: '현재 앱 버전' })
  appVersion: string;

  @Column({ nullable: true, comment: '로그인한 경우 사용자ID (user.id)' })
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
