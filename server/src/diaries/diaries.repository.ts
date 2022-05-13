import { DiaryCreateDto } from './dtos/diaries.create.dto';
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

  async createDiary(diaryCreateDto: DiaryCreateDto) {
    const { id, moodLevel, goalTodo, note } = diaryCreateDto;
    const newDiary = await new this.diaryModel({
      id,
      moodLevel,
      goalTodo,
      note,
    });

    return await newDiary.save();
  }

  async updateDiary(diaryId: string, diaryCreateDto: DiaryCreateDto) {
    const { moodLevel, goalTodo, note } = diaryCreateDto;
    const diary = await this.diaryModel.updateOne(
      { _id: diaryId },
      { $set: { moodLevel, goalTodo, note } },
    );
    return 'update complete'; //success만 확인하기 위해서. 바뀐 문서도 받고싶으면 findOneAndUpdate로 사용
  }

  async deleteDiary(diaryId: string) {
    const diary = await this.diaryModel.deleteOne({ _id: diaryId });
    return 'delete complete'; //success만 확인하기 위해서. 바뀐 문서도 받고싶으면 findOneAndDelete로 사용
  }

  async likeUpDiary(diaryId: string) {
    const diary = await this.diaryModel.findOneAndUpdate(
      { _id: diaryId },
      { $inc: { like: 1 } },
      { new: true },
    );

    return diary;
  }
}
