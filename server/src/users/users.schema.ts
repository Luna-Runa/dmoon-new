import { ApiProperty } from '@nestjs/swagger';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'Luna',
    description: '로그인 아이디',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

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

  @ApiProperty({
    example: '열심히 살기',
    description: '목표',
  })
  @Prop()
  @IsString()
  goal: string;

  @Prop()
  @IsArray()
  friends: Array<string>;

  readonly readOnlyData: {
    id: string;
    name: string;
    friends: Array<string>;
  };
}
export const UserSchema = SchemaFactory.createForClass(User);

//노출될 데이터를 거르기 위해 가상 데이터를 만들어 보냄.
UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    name: this.name,
    friends: this.friends,
  };
});
