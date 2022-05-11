import { SuccessInterceptor } from './../../common/interceptors/success.interceptor';
import { DiariesService } from './../services/diaries.service';
import { CurrentUser } from './../../common/decorators/user.decorator';
import { User } from './../../users/users.schema';
import { JwtAuthGuard } from './../../auth/jwt/jwt.guard';
import { AuthService } from '../../auth/auth.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Post,
  Put,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller('diaries')
@UseInterceptors(SuccessInterceptor)
export class DiariesController {
  constructor(
    private readonly authService: AuthService,
    private readonly diariesServeice: DiariesService,
  ) {}
  @ApiOperation({ summary: '자신의 일기장 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  getDiary(@CurrentUser() user: User) {
    return this.diariesServeice.getAllDiary(user.readOnlyData.id);
  }

  @ApiOperation({ summary: '일기장 추가' })
  @Post('add')
  createDiary() {
    return '새로운 다이어리 생성';
  }

  @ApiOperation({ summary: '일기장 수정' })
  @Put('edit/:id')
  editDiary(@Param('id') id) {
    console.log(id);
    return '다이어리 수정';
  }

  @ApiOperation({ summary: '일기장 삭제' })
  @Delete('delete/:id')
  deleteDiary(@Param('id') id) {
    console.log(id);
    return '다이어리 삭제';
  }

  @ApiOperation({ summary: '일기장 좋아요 증가' })
  @Post('like')
  likeDiary() {
    return '좋아요';
  }
}
