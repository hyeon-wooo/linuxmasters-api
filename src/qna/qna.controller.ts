import {
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QnaService } from './qna.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { LaunchID, TLaunchInfo } from 'src/common/launch.decorator';
import { AnswerQnaDTO, ApplyQnaDTO } from './qna.dto';
import { sendFailRes, sendSuccessRes } from 'src/common/generateResponse';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { ERole } from 'src/auth/role/role.enum';

@Controller('qna')
export class QnaController {
  constructor(private service: QnaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getQnaList(@Req() { user }: Request) {
    const found = await this.service.findMany({
      where: { userId: user.id },
      select: ['id', 'createdAt', 'title'],
    });
    return sendSuccessRes({
      list: found,
    });
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getQnaDetail(@Param('id') qnaId: string, @Req() { user }: Request) {
    const found = await this.service.findOne({ userId: user.id, id: qnaId });
    if (!found) return sendFailRes('존재하지 않는 문의입니다.');

    return sendSuccessRes({
      qna: found,
    });
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: ApplyQnaDTO, @Req() { user }: Request) {
    const created = await this.service.create({
      ...body,
      userId: user.id,
    });

    return sendSuccessRes({ createdId: created[0].id });
  }

  @Post('/:id/answer')
  @Roles(ERole.ADM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async answer(
    @Body() body: AnswerQnaDTO,
    @Req() { user }: Request,
    @Param('id') qnaId: string,
  ) {
    const found = await this.service.findOne({ id: qnaId });
    if (!found) return sendFailRes('존재하지 않는 문의입니다.');

    await this.service.update(
      { id: qnaId },
      { answer: body.answer, answeredAt: new Date() },
    );

    return sendSuccessRes(null);
  }
}
