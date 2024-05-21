import { Module } from '@nestjs/common';
import { CommandController } from './command.controller';
import { CommandService } from './command.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandEntity } from './command.entity';
import { CommandArgsEntity } from './command-args/command-args.entity';
import { CommandOpsEntity } from './command-ops/command-ops.entity';
import { CommandExampleEntity } from './command-example/command-example.entity';
import { CommandBookmarkEntity } from './bookmark/bookmark.entity';
import { CommandArgsService } from './command-args/command-args.service';
import { CommandOpsService } from './command-ops/command-ops.service';
import { CommandExampleService } from './command-example/command-example.service';
import { CommandBookmarkService } from './bookmark/bookmark.service';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommandEntity,
      CommandArgsEntity,
      CommandOpsEntity,
      CommandExampleEntity,
      CommandBookmarkEntity,
    ]),
    HistoryModule,
  ],
  controllers: [CommandController],
  providers: [
    CommandService,
    CommandArgsService,
    CommandOpsService,
    CommandExampleService,
    CommandBookmarkService,
  ],
})
export class CommandModule {}
