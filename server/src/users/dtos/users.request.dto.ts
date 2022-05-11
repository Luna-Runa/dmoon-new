import { User } from '../users.schema';
import { PickType } from '@nestjs/swagger';

export class UserRequestDto extends PickType(User, [
  'id',
  'name',
  'password',
] as const) {}
