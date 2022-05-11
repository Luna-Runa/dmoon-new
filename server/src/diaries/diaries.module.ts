import { Module } from '@nestjs/common';
import { DiariesController } from './controllers/diaries.controller';
import { DiariesService } from './services/diaries.service';

@Module({
  controllers: [DiariesController],
  providers: [DiariesService],
})
export class DiariesModule {}
