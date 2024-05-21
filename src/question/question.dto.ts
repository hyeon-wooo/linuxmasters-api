import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { EQuestionTopic } from './question.enum';
import { DefaultDTO } from 'src/common/default.dto';
import { EStudyAnswerSelection } from 'src/history/study-answer/study-answer-history.enum';

export class QuestionFieldDTO {
  @ApiProperty({ description: '회차 및 급수 정보' })
  roundId: string;

  @ApiProperty({ description: '실제 시험에서의 문항번호 (roundId마다 1~80)' })
  no: number;

  @ApiProperty({ enum: EQuestionTopic, description: '문제의 주제' })
  subject: EQuestionTopic;

  @ApiProperty({ description: '문제 설명' })
  description: string;

  @ApiProperty({ description: '참고 지문(텍스트인 경우)', nullable: true })
  referenceText: string;

  @ApiProperty({ description: '참고 지문(사진인 경우)', nullable: true })
  referenceImg: string;

  @ApiProperty({ description: '정답' })
  answer: number;

  @ApiProperty({
    description: '보기 1번',
    nullable: true,
  })
  select1: string | null;

  @ApiProperty({
    description: '보기 2번',
    nullable: true,
  })
  select2: string | null;

  @ApiProperty({
    description: '보기 3번',
    nullable: true,
  })
  select3: string | null;

  @ApiProperty({
    description: '보기 4번',
    nullable: true,
  })
  select4: string | null;

  @ApiProperty({
    description: '보기 5번',
    nullable: true,
  })
  select5: string | null;
}
export class QuestionDTO extends IntersectionType(
  DefaultDTO,
  QuestionFieldDTO,
) {}

export class CreateQuestionBodyDTO extends QuestionFieldDTO {}

export class SelectQuestionBodyDTO {
  @ApiProperty({ description: '급수' })
  className: string;
  @ApiProperty({ description: '회차이름' })
  roundName: string;
  @ApiProperty({ description: '주제' })
  topics: EQuestionTopic[];
}

export class QuestionCompleteBodyDTO {
  @ApiProperty({ description: '기출문제 선택내역ID (history_study_select.id)' })
  selectId: string;

  @ApiProperty({ description: '채점 시 선택한 보기번호', nullable: true })
  selectedAnswerNumber: number | null;
}

export class QuestionCommentQueryDTO {
  @ApiProperty({ description: '기출문제 선택내역ID (history_study_select.id)' })
  selectId: string;
}

export class QuestionRoundQueryDTO {
  @ApiPropertyOptional({ description: '급수' })
  className: string | null;
}
