/**
 * Created by Micheal Adeyinka
 */

import mongoose from 'mongoose';
//const config = require('../config/config');
import { config } from '../config/config'
// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
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


export const userModel = mongoose.model(config.mongo.collections.hobby, userSchema);

