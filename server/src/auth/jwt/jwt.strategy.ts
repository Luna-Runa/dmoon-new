import { UsersRepository } from '../../users/users.repository';
import { Payload } from './jwt.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

//jwt 인증 전략 : guard -> strategy자동실행 -> validate
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Bearer토큰을 Auth헤더에서 추출 추출
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY, //이 키로 디코딩
    });
  }

  //유효성 검증
  async validate(payload: Payload) {
    const user = await this.usersRepository.findUserByIdWithoutPassword(
      payload.sub,
    );

    if (user) return user; //req.user
    else throw new UnauthorizedException('접근 오류');
  }
}
