import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email: string;
  readonly imageUrl?: string;
  readonly password: string;
  readonly role?: string;
}
export interface IDecodedUser {
  readonly id: string;
  readonly email: string;
  readonly role?: string;
  readonly exp: string;
}
