import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'lm_round' })
export class RoundEntity extends DefaultEntity {
  @Column({ comment: '회차 이름' })
  name: string;

  @Column({ comment: '급수' })
  className: string;
}
