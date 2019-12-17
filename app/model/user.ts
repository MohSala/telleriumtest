/**
 * Created by Micheal Adeyinka
 */

import mongoose from 'mongoose';
import { config } from '../config/config'
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    hobbies: [
      { type: Schema.Types.ObjectId, ref: config.mongo.collections.hobby }
    ]
  },
  {
    timestamps: true
  }
);


export const userModel = mongoose.model(config.mongo.collections.users, userSchema);

