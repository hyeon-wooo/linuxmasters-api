import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommandArgsEntity } from './command-args/command-args.entity';
import { CommandOpsEntity } from './command-ops/command-ops.entity';
import { CommandExampleEntity } from './command-example/command-example.entity';
import { EQuestionTopic } from 'src/question/question.enum';

@Entity({ name: 'lm_commands' })
export class CommandEntity extends DefaultEntity {
  @Column({ comment: '명령어 이름' })
  name: string;
  @Column({ comment: '설명' })
  description: string;

  @Column('enum', { enum: EQuestionTopic, comment: '주제' })
  topic: EQuestionTopic;

  @OneToMany(() => CommandArgsEntity, (args) => args.command)
  args: CommandArgsEntity[];

  @OneToMany(() => CommandOpsEntity, (ops) => ops.command)
  options: CommandOpsEntity[];

  @OneToMany(() => CommandExampleEntity, (example) => example.command)
  examples: CommandExampleEntity[];
}
