import { User } from './../users.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
  'name',
] as const) {
  @ApiProperty({
    example: '61d02ad92jdlwdiw9d97',
    description: '아이디 (MongoDB _id)',
  })
  id: string;
}
