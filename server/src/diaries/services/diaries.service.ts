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

  async createDiary(diaryCreateDto: DiaryCreateDto) {
    const diary = await this.diariesRepository.createDiary(diaryCreateDto);
    return diary;
  }

  async editDiary(diaryId: string, diaryCreateDto: DiaryCreateDto) {
    const diary = await this.diariesRepository.updateDiary(
      diaryId,
      diaryCreateDto,
    );
    return diary;
  }

  async deleteDiary(diaryId: string) {
    const diary = await this.diariesRepository.deleteDiary(diaryId);
    return diary;
  }

  async likeDiary(diaryId: string) {
    const diary = await this.diariesRepository.likeUpDiary(diaryId);
    return diary;
  }
}
