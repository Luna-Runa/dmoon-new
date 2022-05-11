import { LoginRequestDto } from './dto/login.request.dto';
import { UsersRepository } from './../users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService, //JwtModule 안에 있음
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { id, password } = data;

    //유효성 검사
    const user = await this.usersRepository.findUserById(id);

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!user)
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    else if (!isPasswordValidated)
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');

    //jwt 생성
    const payload = { id: id, sub: user._id };

    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
      }),
    };
  }
}
