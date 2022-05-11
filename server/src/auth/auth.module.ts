import { UsersModule } from './../users/users.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

//로그인 요청 -> auth service -> 시크릿키 인코딩 JWT -> 발급
//사용자 인증 요청 -> JWT Guard -> JWT strategy -> 유효성 검증 -> 유저 정보 반환
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '2h' },
    }),

    forwardRef(() => UsersModule), //양쪽에서 순환참조를 하기 때문
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
