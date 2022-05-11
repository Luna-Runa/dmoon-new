import { DiariesRepository } from './../diaries.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiariesService {
  constructor(private readonly diariesRepository: DiariesRepository) {}

  async getAllDiary(id: string) {
    const allDiary = await this.diariesRepository.findDiaryById(id);

    return allDiary;
  }
}
