import { User } from './../../users/users.schema';
import { PickType } from '@nestjs/swagger';

//User Schema에서 id와 password만 상속
export class LoginRequestDto extends PickType(User, [
  'id',
  'password',
] as const) {}
