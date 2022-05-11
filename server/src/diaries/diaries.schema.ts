import { ApiProperty } from '@nestjs/swagger';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Diary extends Document {
  @ApiProperty({
    example: 'Luna',
    description: '일기 작성자',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  writer: string;

  @ApiProperty({
    example: '2',
    description: '기분 수준 (1~5)',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  moodLevel: number;

  @ApiProperty({
    example: 'true',
    description: '목표 성공 여부',
  })
  @Prop()
  @IsBoolean()
  goalTodo: boolean;

  @ApiProperty({
    example: '하루종일 공부했어',
    description: '노트',
  })
  @Prop()
  @IsString()
  note: string;

  @ApiProperty({
    example: '3',
    description: '좋아요 수',
  })
  @Prop({ default: 0 })
  @IsPositive()
  @IsInt()
  like: number;
}
export const DiarySchema = SchemaFactory.createForClass(Diary);
