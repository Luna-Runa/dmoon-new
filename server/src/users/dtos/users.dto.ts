import { User } from './../users.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class ReadOnlyUserDto extends PickType(User, ['id', 'name'] as const) {
  @ApiProperty({
    example: 'Luna',
    description: '유저 아이디',
  })
  id: string;
}
