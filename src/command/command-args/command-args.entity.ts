import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommandEntity } from '../command.entity';

/** 명령어 인자 사전 */
@Entity({ name: 'lm_dict_args' })
export class CommandArgsEntity extends DefaultEntity {
  @Column({ comment: '명령어ID (command.id)' })
  commandId: string;
  @Column({ comment: '인자 이름' })
  name: string;
  @Column({ comment: '설명' })
  description: string;
  @Column({ comment: '표시 순서' })
  sequence: number;

  @ManyToOne(() => CommandEntity, (co) => co.args)
  @JoinColumn({ name: 'commandId' })
  command: CommandEntity;
}
