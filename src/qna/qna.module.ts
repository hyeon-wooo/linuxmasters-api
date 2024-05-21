import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QnaEntity } from './qna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QnaEntity])],
  controllers: [QnaController],
  providers: [QnaService],
  exports: [QnaService],
})
export class QnaModule {}
