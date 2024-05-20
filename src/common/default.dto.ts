import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export abstract class DefaultDTO {
  @ApiProperty({ description: 'PK' })
  @IsString()
  id: string;

  @ApiProperty({ description: '데이터 생성일시' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '데이터 변경일시' })
  @IsDate()
  updatedAt: Date;

  @ApiPropertyOptional({ description: '데이터 삭제일시' })
  deletedAt?: Date | null;
}

export class ListQueryDTO {
  @ApiPropertyOptional({ description: 'n개만 조회' })
  @IsString()
  @IsOptional()
  limit?: string;
  @ApiPropertyOptional({ description: '앞에서부터 n개 제외' })
  @IsString()
  @IsOptional()
  from?: string;
  @ApiPropertyOptional({
    description: '목록의 아이템 갯수와 무관한 전체 row 갯수를 응답받을지 여부',
  })
  @IsString()
  @IsOptional()
  needTotalCount?: string;
}

export class OnlyIdDTO {
  @ApiProperty({ description: 'PK' })
  @IsString()
  id: string;
}
