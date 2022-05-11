import { CommentsSchema } from './../comments/comments.schema';
import { UserRequestDto } from './dtos/users.request.dto';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import * as mongoose from 'mongoose';

//DB와 통신할 쿼리를 관리할 레포지토리 패턴
@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);

    const result = await this.userModel
      .find()
      .populate('comments', CommentsModel);

    return result; //조건이 없을시 모두
  }

  async findUserByIdWithoutPassword(
    userId: string | Types.ObjectId,
  ): Promise<User | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }

  /* async findByIdAndUpdateImg(
    id: string,
    fileName: string,
  ): Promise<ReadOnlyUserDto> {
    const user = await this.userModel.findById(id);

    user.imgUrl = `http://localhost:${process.env.PORT}/media/${fileName}`;

    const newUser = await user.save();
    console.log(newUser);

    return newUser.readOnlyData;
  } */

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    return result ? true : false;
  }

  async create(user: UserRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
