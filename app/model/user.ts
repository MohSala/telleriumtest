/**
 * Created by Micheal Adeyinka
 */

import mongoose from 'mongoose';
import { config } from '../config/config'
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    // _id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    // hobbies: {
    //   type: [String],
    //   default: false,
    //   required: true
    // },
    hobbies: [
      { type: Schema.Types.ObjectId, ref: 'hobbies' }
    ]
  },
  {
    timestamps: true
  }
);


export const userModel = mongoose.model(config.mongo.collections.users, userSchema);

