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
import { QuestionService } from './question.service';
import { RoundService } from './round/round.service';
import { CommentService } from './\bcomment/comment.service';
import { HistoryService } from 'src/history/history.service';
import {
  CreateQuestionBodyDTO,
  QuestionCommentQueryDTO,
  QuestionCompleteBodyDTO,
  QuestionRoundQueryDTO,
  SelectQuestionBodyDTO,
} from './question.dto';
import { sendFailRes, sendSuccessRes } from 'src/common/generateResponse';
import { FindOptionsWhere, In, IsNull, Not } from 'typeorm';
import { extractRandomN } from 'src/lib/utils/random';
import { QuestionEntity } from './question.entity';
import { EStudyAnswerSelection } from 'src/history/study-answer/study-answer-history.enum';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

@Controller('question')
export class QuestionController {
  constructor(
    private service: QuestionService,
    private roundService: RoundService,
    private commentService: CommentService,
    private historyService: HistoryService,
  ) {}

  // 문제 등록
  @Post('/')
  async create(@Body() body: CreateQuestionBodyDTO) {
    const round = await this.roundService.findOne({ id: body.roundId });
    if (!round) return sendFailRes('존재하지 않는 회차입니다.');

    await this.service.create(body);

    return sendSuccessRes(null);
  }

  // 기출문제 공부 시작 (문제배열 및 selectHistoryId 응답)
  @Post('/select')
  async selectQuestion(@Body() body: SelectQuestionBodyDTO) {
    const { className, roundName, topics } = body;

    // 히스토리 저장
    const selectHistory = await this.historyService.saveStudySelect({
      className,
      roundName,
      topics: topics?.map((t) => '#' + t).join('') ?? null,
    });
    const selectHistoryId = selectHistory[0].id;

    // 회차 상관없음
    if (!roundName) {
      const questionIds = await this.service.getAllQidByClassName(className);
      // 이 중 20개를 랜덤으로 선택

      const randomQuestionIds = extractRandomN<string>(questionIds, 20);

      const questions = await this.service.findMany({
        where: { id: In(randomQuestionIds), topic: In(topics) },
      });

      return sendSuccessRes({ selectHistoryId, questions });
    }

    const round = await this.roundService.findOne({
      className: className,
      name: roundName,
    });
    const questions = await this.service.findMany({
      where: { roundId: round.id, topic: In(topics) },
    });

    return sendSuccessRes({ selectHistoryId, questions });
  }

  // 기출문제 채점 이력 저장
  @Post('/:id/complete')
  @UseGuards(JwtAuthGuard)
  async complete(
    @Body() body: QuestionCompleteBodyDTO,
    @Param('id') questionId: string,
    @Req() { user }: Request,
  ) {
    // 히스토리 저장
    const { selectId, selectedAnswerNumber } = body;

    const found = await this.service.findOne({ id: questionId });
    const correct = found.answer === selectedAnswerNumber;

    this.historyService.saveStudyAnswer({
      selectId,
      questionId,
      userId: user.id,
      selectedAnswerNumber,
      selection: EStudyAnswerSelection.CHECK_ANSWER,
      correct,
    });

    return sendSuccessRes(null);
  }

  // 회차 및 주제 조회
  @Get('/rounds-and-topics')
  async getRounds(@Query() query: QuestionRoundQueryDTO) {
    const all = await this.roundService.findAll();
    return sendSuccessRes({ rounds: all, topics: this.service.getAllTopics() });
  }

  // 해설 조회
  @Get('/:id/comment')
  @UseGuards(JwtAuthGuard)
  async getComment(
    @Query() query: QuestionCommentQueryDTO,
    @Param('id') questionId: string,
    @Req() { user }: Request,
  ) {
    const { selectId } = query;

    this.historyService.saveStudyAnswer({
      selectId,
      questionId,
      userId: user.id,
      selectedAnswerNumber: null,
      selection: EStudyAnswerSelection.CHECK_ANSWER,
      correct: null,
    });

    const comment = await this.commentService.findOne({ questionId });

    return sendSuccessRes({ comment });
  }
}
