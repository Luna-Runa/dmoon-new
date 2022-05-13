import { JwtAuthGuard } from './../../auth/jwt/jwt.guard';
import { DiaryCreateDto } from './../dtos/diaries.create.dto';
import { SuccessInterceptor } from './../../common/interceptors/success.interceptor';
import { DiariesService } from './../services/diaries.service';
import { CurrentUser } from './../../common/decorators/user.decorator';
import { User } from './../../users/users.schema';
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
  Body,
} from '@nestjs/common';

@Controller('diaries')
@UseGuards(JwtAuthGuard)
@UseInterceptors(SuccessInterceptor)
export class DiariesController {
  constructor(
    private readonly authService: AuthService,
    private readonly diariesServeice: DiariesService,
  ) {}
  @ApiOperation({ summary: '자신의 일기장 가져오기' })
  @Get('list')
  getDiary(@CurrentUser() user: User) {
    return this.diariesServeice.getAllDiary(user.readOnlyData.id);
  }

  @ApiOperation({ summary: '일기장 추가' })
  @Post('add')
  createDiary(@Body() diaryCreateDto: DiaryCreateDto) {
    return this.diariesServeice.createDiary(diaryCreateDto);
  }

  @ApiOperation({ summary: '일기장 수정' })
  @Put('edit/:id')
  editDiary(@Param('id') diaryId, @Body() diaryCreateDto: DiaryCreateDto) {
    return this.diariesServeice.editDiary(diaryId, diaryCreateDto);
  }

  @ApiOperation({ summary: '일기장 삭제' })
  @Delete('delete/:id')
  deleteDiary(@Param('id') diaryId) {
    return this.diariesServeice.deleteDiary(diaryId);
  }

  @ApiOperation({ summary: '일기장 좋아요 증가' })
  @Post('like/:id')
  likeDiary(@Param('id') diaryId) {
    return this.diariesServeice.likeDiary(diaryId);
  }
}
