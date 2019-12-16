/**
 * Created by Micheal Adeyinka
 */

const mongoose = require('mongoose');
const config = require('../config/config');

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
    hobbies: {
      type: [String],
      default: false,
      required: true
    },
  },
  {
    timestamps: true
  }
);


export const userModel = mongoose.model(config.mongo.collections.users, userSchema);

