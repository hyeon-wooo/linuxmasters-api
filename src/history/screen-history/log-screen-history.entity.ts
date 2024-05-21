import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'lm_history_screen' })
export class ScreenHistoryLogEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '테이블의 각 데이터를 구분짓는 고유값 (uuid 형식)',
  })
  id: string;

  @CreateDateColumn({ comment: 'row 생성일시' })
  createdAt: Date;

  @Column('timestamp', {
    comment: 'insert되는 시간(createdAt)이 아닌 api서버에서 측정한 진입시간',
  })
  enteredAt: Date;

  @Column({ nullable: true })
  userId: string;

  @Column({ comment: '진입한 화면ID' })
  screenName: string;

  @Column({})
  launchId: string;
}
