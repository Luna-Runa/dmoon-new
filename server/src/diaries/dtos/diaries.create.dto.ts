import { Diary } from '../diaries.schema';
import { PickType } from '@nestjs/swagger';

export class DiaryCreateDto extends PickType(Diary, [
  'id',
  'moodLevel',
  'goalTodo',
  'note',
] as const) {}
