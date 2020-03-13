import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly _id: string;
  @Field({ nullable: true })
  readonly firstName?: string;
  @Field({ nullable: true })
  readonly lastName?: string;
  @Field()
  readonly password: string;
  @Field()
  readonly email: string;
  @Field({ nullable: true })
  readonly role?: string;
  @Field({ nullable: true })
  readonly imageUrl?: string;
}

@ObjectType()
export class LogInType {
  @Field()
  readonly token: string;
  @Field()
  readonly isLoggedIn: boolean;
}
