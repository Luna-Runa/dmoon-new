import { ReadOnlyUserDto } from './../dtos/users.dto';
import { User } from './../users.schema';
import { UsersRepository } from './../users.repository';
import { UserRequestDto } from './../dtos/users.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UserRequestDto): Promise<ReadOnlyUserDto> {
    const { id, name, password } = body;
    const isUserExist = await this.usersRepository.existsById(id);

    if (isUserExist)
      throw new UnauthorizedException('이미 존재하는 아이디입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.createUser({
      id,
      name,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }

  async searchUser(keyword: string): Promise<User[] | null> {
    const users = await this.usersRepository.searchUser(keyword);
    return users;
  }
}
