import { ObjectType, Field, ID } from 'type-graphql';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly _id: string;
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly firstName?: string;
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly lastName?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  @Field()
  @IsString()
  @IsEmail()
  readonly email: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly role?: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly imageUrl?: string;
}
