import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    imageUrl: String,
    password: String,
    role: {
      type: String,
      role: ['admin', 'instructor', 'student'],
    },
  },
  { timestamps: true },
);
