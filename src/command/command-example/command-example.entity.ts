import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommandEntity } from '../command.entity';

/** 명령어 예시 사전 */
@Entity({ name: 'lm_command_examples' })
export class CommandExampleEntity extends DefaultEntity {
  @Column({ comment: '명령어ID (command.id)' })
  commandId: string;
  @Column({ comment: '예시' })
  name: string;
  @Column({ comment: '설명' })
  description: string;
  @Column({ comment: '표시 순서' })
  sequence: number;

  @ManyToOne(() => CommandEntity, (co) => co.examples)
  @JoinColumn({ name: 'commandId' })
  command: CommandEntity;
}
