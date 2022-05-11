import { UsersService } from './users.service';
import { UserRequestDto } from './dtos/users.request.dto';
//import { AuthService } from './../auth/auth.service';
import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(
    //private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return '로그인';
    //return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: UserRequestDto) {
    return '회원가입';
    //return await this.UsersService.signUp(body);
  }
}
