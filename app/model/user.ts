import mongoose, { Model } from 'mongoose';
import { config } from '../config/config'

export interface UserPayload {
  _id: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);


export const userModel: Model<UserPayload> = mongoose.model<UserPayload>(config.mongo.collections.users, userSchema);

