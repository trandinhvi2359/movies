import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findByListIds(ids: Array<string>): Promise<Array<User>> {
    return this.userModel.find({ _id: ids }).exec();
  }

  async register(name: string, email: string, password: string): Promise<User> {
    return this.userModel.create({
      name,
      email,
      password,
    });
  }
}
