import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommandEntity } from '../command.entity';

/** 명령어 옵션 사전 */
@Entity({ name: 'lm_command_ops' })
export class CommandOpsEntity extends DefaultEntity {
  @Column({ comment: '명령어ID (command.id)' })
  commandId: string;
  @Column({ comment: '옵션 형식' })
  name: string;
  @Column({ comment: '설명' })
  description: string;
  @Column({ comment: '표시 순서' })
  sequence: number;

  @ManyToOne(() => CommandEntity, (co) => co.options)
  @JoinColumn({ name: 'commandId' })
  command: CommandEntity;
}
