import { UserRequestDto } from './dtos/users.request.dto';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

//DB와 통신할 쿼리를 관리할 레포지토리 패턴
@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserByIdWithoutPassword(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).select('-password');
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({ id });
    return user;
  }

  async existsById(id: string): Promise<boolean> {
    const result = await this.userModel.exists({ id });
    return result ? true : false;
  }

  async createUser(user: UserRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
