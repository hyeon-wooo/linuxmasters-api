import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { DefaultDTO } from 'src/common/default.dto';
import { EQnaStatus } from './qna.enum';

export class QnaFieldDTO {
  @ApiProperty({
    enum: EQnaStatus,
    description: '상태',
    default: EQnaStatus.APPLIED,
  })
  status: EQnaStatus;

  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '문의내용 본문' })
  content: string;

  @ApiProperty({ description: '답변내용' })
  answer: string;

  @ApiProperty({ description: '답변일시' })
  answeredAt: Date;

  @ApiProperty({ description: '사용자ID' })
  userId: string;
}

export class QnaDTO extends IntersectionType(DefaultDTO, QnaFieldDTO) {}

export class ApplyQnaDTO extends PickType(QnaDTO, ['title', 'content']) {}

export class AnswerQnaDTO extends PickType(QnaDTO, ['answer']) {}
