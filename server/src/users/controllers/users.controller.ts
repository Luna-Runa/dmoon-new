import { JwtAuthGuard } from './../../auth/jwt/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { SuccessInterceptor } from './../../common/interceptors/success.interceptor';
import { User } from './../users.schema';
import { CurrentUser } from './../../common/decorators/user.decorator';
import { AuthService } from './../../auth/auth.service';
import { UsersService } from './../services/users.service';
import { UserRequestDto } from '../dtos/users.request.dto';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Body,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: '로그인 한 유저 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('info')
  getCurrentUser(@CurrentUser() user: User) {
    return user.readOnlyData;
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '회원가입' })
  @Post('register')
  async signUp(@Body() body: UserRequestDto) {
    return await this.usersService.signUp(body);
  }

  @ApiOperation({ summary: '회원 검색' })
  @Post('search/:keyword')
  async searchUser(@Param('keyword') keyword: string) {
    return await this.usersService.searchUser(keyword);
  }
}
