// types.d.ts

import { Types } from 'mongoose';

declare global {
  interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
  }
}
