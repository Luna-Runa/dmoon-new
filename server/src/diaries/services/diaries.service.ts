import { DiaryCreateDto } from './../dtos/diaries.create.dto';
import { DiariesRepository } from './../diaries.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiariesService {
  constructor(private readonly diariesRepository: DiariesRepository) {}

  async getAllDiary(id: string) {
    const allDiary = await this.diariesRepository.findDiaryById(id);

    return allDiary;
  }

  async createDiary(body: DiaryCreateDto) {
    const { writer, moodLevel, goalTodo, note } = body;
    const diary = await this.diariesRepository.createDiary(
      writer,
      moodLevel,
      goalTodo,
      note,
    );
    return diary;
  }
}
