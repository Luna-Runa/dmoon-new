import { Diary } from './diaries.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

//DB와 통신할 쿼리를 관리할 레포지토리 패턴
@Injectable()
export class DiariesRepository {
  constructor(
    @InjectModel(Diary.name) private readonly diaryModel: Model<Diary>,
  ) {}

  async findDiaryById(id: string) {
    const diary = await this.diaryModel.find({ id });
    return diary;
  }
}
