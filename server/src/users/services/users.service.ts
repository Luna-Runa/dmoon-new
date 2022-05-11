import { UsersRepository } from './../users.repository';
import { UserRequestDto } from './../dtos/users.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UserRequestDto) {
    const { id, name, password } = body;
    const isUserExist = await this.usersRepository.existsById(id);

    if (isUserExist)
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.createUser({
      id,
      name,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }
}
