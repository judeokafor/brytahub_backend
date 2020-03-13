import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserInput } from './inputs/input-user.input';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async create(createItemDto: UserInput): Promise<UserType> {
    const createdUser = new this.userModel(createItemDto);
    return await createdUser.save();
  }

  async findAll(): Promise<UserType[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserType> {
    return await this.userModel.findOne({ _id: id });
  }
  async findByEmail(email: string): Promise<UserType> {
    return await this.userModel.findOne({ email });
  }

  async delete(id: string): Promise<UserType> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, item: IUser): Promise<UserType> {
    return await this.userModel.findByIdAndUpdate(id, item, { new: true });
  }
}
