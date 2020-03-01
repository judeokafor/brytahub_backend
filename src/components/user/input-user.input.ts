import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  readonly firstName?: string;
  @Field({ nullable: true })
  readonly lastName?: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
  @Field({ nullable: true })
  readonly role?: string = 'student';
}
