import { InputType, Field } from 'type-graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';
@InputType()
export class UserInput {
  @Field({ nullable: true })
  readonly firstName?: string;
  @Field({ nullable: true })
  readonly lastName?: string;
  @Field({ nullable: true })
  imageUrl?: string;
  @Field()
  readonly email: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  readonly role?: string = 'student';
}
@InputType()
export class ImageUpload {
  @Field(() => GraphQLUpload)
  readonly file: FileUpload;
}
@InputType()
export class LoginInput {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}
