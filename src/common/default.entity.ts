import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DefaultEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '테이블의 각 데이터를 구분짓는 고유값 (uuid 형식)',
  })
  id: string;

  @CreateDateColumn({ comment: 'row 생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: 'row 수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: 'row 삭제일시' })
  deletedAt?: Date;
}
