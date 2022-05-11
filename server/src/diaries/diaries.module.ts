import { Diary, DiarySchema } from './diaries.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './../auth/auth.module';
import { DiariesRepository } from './diaries.repository';
import { Module, forwardRef } from '@nestjs/common';
import { DiariesController } from './controllers/diaries.controller';
import { DiariesService } from './services/diaries.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Diary.name, schema: DiarySchema }]),
  ],
  controllers: [DiariesController],
  providers: [DiariesService, DiariesRepository],
})
export class DiariesModule {}
