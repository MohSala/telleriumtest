/**
 * Created by Micheal Adeyinka
 */

import mongoose from 'mongoose';
import { config } from '../config/config'
const Schema = mongoose.Schema;
const hobbySchema = new mongoose.Schema(
  {
    id: {
       type: Schema.Types.ObjectId, ref: config.mongo.collections.users,
    },
    name: {
      type: String,
      default: 'user',
      required: true
    },
    passionLevel: {
        type: String,
        required: true,
        enum: ['Low', 'High', 'Medium', 'Very-High']
      },
      year: {
        type: String,
        required: true
      },
  },
  {
    timestamps: true
  }
);


export const hobbyModel = mongoose.model(config.mongo.collections.hobby, hobbySchema);

