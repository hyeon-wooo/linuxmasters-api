import { DefaultEntity } from 'src/common/default.entity';
import { Column, Entity } from 'typeorm';

/** 명령어 북마크 내역 */
@Entity({ name: 'lm_command_bookmarks' })
export class CommandBookmarkEntity extends DefaultEntity {
  @Column({ comment: '명령어ID (command.id)' })
  commandId: string;
  @Column({ comment: '사용자ID (user.id)' })
  userId: string;
}
