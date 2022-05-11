import { Comments } from './../comments/comments.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'Luna@gmail.com',
    description: '이메일',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '루나',
    description: '닉네임',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsArray()
  friends: Array<string>;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    friends: Array<string>;
  };

  readonly comments: Comments[];
}
export const UserSchema = SchemaFactory.createForClass(User);

//노출될 데이터를 거르기 위해 가상 데이터를 만들어 보냄.
UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    friends: this.friends,
  };
});

/* export const _CatSchema = SchemaFactory.createForClass(Cat);

//노출될 데이터를 거르기 위해 가상 데이터를 만들어 보냄.
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

//populate
_CatSchema.virtual('comments', {
  ref: 'comments', //comments 스키마에서 info에 대해서 참조 (댓글이 달린 고양이에 뜨게 하기 위해서)
  localField: '_id',
  foreignField: 'info',
});

_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
 */
