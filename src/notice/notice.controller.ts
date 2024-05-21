import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { sendSuccessRes } from 'src/common/generateResponse';
import { CreateNoticeBodyDTO, NoticeListQueryDTO } from './notice.dto';

@Controller('notice')
export class NoticeController {
  constructor(private service: NoticeService) {}

  @Get('/')
  async getList(@Query() query: NoticeListQueryDTO) {
    if (query.limit) {
      const found = await this.service.findMany({
        select: ['id', 'createdAt', 'subject'],
        take: query.limit,
      });

      return sendSuccessRes({ notices: found });
    }

    const found = await this.service.findMany({
      select: ['id', 'createdAt', 'subject'],
    });

    return sendSuccessRes({ notices: found });
  }

  @Get('/:id')
  async getDetail(@Param('id') noticeId: string) {
    const found = await this.service.findOne({ id: noticeId });
    return sendSuccessRes({ notice: found });
  }

  @Post('/')
  async create(@Body() body: CreateNoticeBodyDTO) {
    const created = await this.service.create(body);
    return sendSuccessRes({ createdId: created[0].id });
  }
}
