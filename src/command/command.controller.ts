import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandArgsService } from './command-args/command-args.service';
import { CommandOpsService } from './command-ops/command-ops.service';
import { CommandExampleService } from './command-example/command-example.service';
import { CommandBookmarkService } from './bookmark/bookmark.service';
import {
  CommandListItemDTO,
  CommandListQueryDTO,
  CreateCommandArgsBodyDTO,
  CreateCommandBodyDTO,
  CreateCommandExampleBodyDTO,
  CreateCommandOptionBodyDTO,
} from './command.dto';
import { FindOptionsWhere, In, MoreThan } from 'typeorm';
import { CommandEntity } from './command.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { sendSuccessRes } from 'src/common/generateResponse';
import { HistoryService } from 'src/history/history.service';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { ERole } from 'src/auth/role/role.enum';
import { LaunchID, TLaunchInfo } from 'src/common/launch.decorator';

@Controller('command')
export class CommandController {
  constructor(
    private service: CommandService,
    private argService: CommandArgsService,
    private opService: CommandOpsService,
    private exampleService: CommandExampleService,
    private bookmarkService: CommandBookmarkService,
    private historyService: HistoryService,
  ) {}

  // 목록 조회
  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getList(@Query() query: CommandListQueryDTO, @Req() { user }: Request) {
    const { topic, lastItemName, limit } = query;

    const condition: FindOptionsWhere<CommandEntity> = {};
    if (topic) condition.topic = topic;
    if (lastItemName) condition.name = MoreThan(lastItemName);

    const found = await this.service.findMany({
      where: condition,
      order: { name: 'ASC' },
      take: limit,
      select: ['id', 'name', 'description'],
    });

    if (!found.length) return sendSuccessRes({ commands: [] });

    const bookmarks = await this.bookmarkService.findMany({
      where: { commandId: In(found.map((c) => c.id)), userId: user.id },
      select: ['id', 'commandId'],
    });
    const resCommands = found.map<CommandListItemDTO>((c) => ({
      ...c,
      marked: !!bookmarks.find((b) => b.commandId === c.id),
    }));

    return sendSuccessRes({ commands: resCommands });
  }

  // 북마크 조회
  @Get('/marked')
  @UseGuards(JwtAuthGuard)
  async getBookmarkedList(@Req() { user }: Request) {
    const marks = await this.bookmarkService.findMany({
      where: { userId: user.id },
      select: ['id', 'commandId'],
    });
    const makredCommandIds = marks.map((m) => m.commandId);

    const commands = await this.service.findMany({
      where: { id: In(makredCommandIds) },
      select: ['id', 'name', 'description'],
    });

    return sendSuccessRes({ commands });
  }

  // 상세 조회
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getDetail(
    @Param('id') commandId: string,
    @Req() { user }: Request,
    @LaunchID() launch: TLaunchInfo,
  ) {
    // 히스토리 저장
    this.historyService.saveCommandRead({
      commandId,
      userId: user.id,
      launchId: launch.launchId,
    });

    const found = await this.service.findOne({ id: commandId }, [
      'args',
      'options',
      'examples',
    ]);
    return sendSuccessRes({ command: found });
  }

  // 명령어 추가
  @Post('/')
  // @Roles(ERole.ADM)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() body: CreateCommandBodyDTO) {
    const created = await this.service.create(body);

    return sendSuccessRes({ createdId: created[0].id });
  }

  // 명령어 인자 추가
  @Post('/:id/args')
  // @Roles(ERole.ADM)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async createArgs(
    @Body() body: CreateCommandArgsBodyDTO,
    @Param('id') commandId: string,
  ) {
    const created = await this.argService.create({ ...body, commandId });

    return sendSuccessRes({ createdId: created[0].id });
  }

  // 명령어 옵션 추가
  @Post('/:id/option')
  // @Roles(ERole.ADM)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async createOption(
    @Body() body: CreateCommandOptionBodyDTO,
    @Param('id') commandId: string,
  ) {
    const created = await this.argService.create({ ...body, commandId });

    return sendSuccessRes({ createdId: created[0].id });
  }

  // 명령어 예시 추가
  @Post('/:id/example')
  // @Roles(ERole.ADM)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async createExample(
    @Body() body: CreateCommandExampleBodyDTO,
    @Param('id') commandId: string,
  ) {
    const created = await this.argService.create({ ...body, commandId });

    return sendSuccessRes({ createdId: created[0].id });
  }

  // 북마크 추가/제거
  @Post('/:id/mark')
  @UseGuards(JwtAuthGuard)
  async mark(@Param('id') commandId: string, @Req() { user }: Request) {
    const already = await this.bookmarkService.findOne({
      commandId,
      userId: user.id,
    });
    if (already) {
      await this.bookmarkService.deleteMany([already.id]);
      return sendSuccessRes({ marked: false });
    }

    await this.bookmarkService.create({ commandId, userId: user.id });
    return sendSuccessRes({ marked: true });
  }
}
