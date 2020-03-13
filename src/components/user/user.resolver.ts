import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Arg, Int } from 'type-graphql';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserType, LogInType } from './dto/create-user.dto';
import { UserInput, LoginInput } from './inputs/input-user.input';

import { FileUpload, GraphQLUpload } from 'graphql-upload';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as gravatar from 'gravatar';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from '../shared/user.decorators';
import { IDecodedUser } from './interfaces/user.interface';
@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [UserType])
  @UseGuards(AuthGuard)
  async users(@User() user: IDecodedUser): Promise<UserType[]> {
    console.log(user.id);
    return this.userService.findAll();
  }
  @Query(() => UserType)
  @UseGuards(AuthGuard)
  async singleUser(@Args('id') id: string): Promise<UserType> {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput): Promise<UserType> {
    const user = await this.userService.findByEmail(input.email);
    if (user) throw new NotFoundException('User already exist');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(input.password, salt);
    const avatar = gravatar.url(input.email, { s: '200', r: 'pg', d: 'mm' });
    input.password = hash;
    input.imageUrl = avatar;
    return this.userService.create(input);
  }
  @Mutation(() => LogInType)
  async loginUser(
    @Args('input') { email, password }: LoginInput,
    req: Request,
  ): Promise<LogInType> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('User does not exist');
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      // @TODO: take this seceret and put in an enviroment variable
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        'brytahub_rocks',
      );
      req.headers.authorization = token;
      return { isLoggedIn: true, token };
    } else {
      throw new NotFoundException('Invalid password!');
    }
  }

  @Mutation(() => Boolean)
  async singleUpload(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
  ): Promise<boolean> {
    console.log(file);
    return true;
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UserInput,
  ): Promise<UserType> {
    return this.userService.update(id, input);
  }

  @Mutation(() => UserType)
  async deleteUser(@Args('id') id: string): Promise<UserType> {
    return this.userService.delete(id);
  }
}
