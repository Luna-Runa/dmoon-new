import { AuthService } from './../../auth/auth.service';
import { UsersService } from './../services/users.service';
import { UserRequestDto } from '../dtos/users.request.dto';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: UserRequestDto) {
    return await this.usersService.signUp(body);
  }
}
