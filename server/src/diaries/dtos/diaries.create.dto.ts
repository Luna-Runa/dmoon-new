import { Diary } from '../diaries.schema';
import { PickType } from '@nestjs/swagger';

export class DiaryCreateDto extends PickType(Diary, [
  'writer',
  'moodLevel',
  'goalTodo',
  'note',
]) {}
