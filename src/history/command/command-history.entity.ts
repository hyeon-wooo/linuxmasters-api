import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'lm_history_command' })
export class CommandHistoryEntity extends DefaultEntity {
  @Column({ comment: '명령어ID (command.id)' })
  commandId: string;
  @Column({ comment: '사용자ID (user.id)' })
  userId: string;

  @Column({ comment: '앱실행내역ID (launch.id)' })
  launchId: string;
}
