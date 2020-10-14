import mongoose from 'mongoose';
import { config } from '../config/config'
const Schema = mongoose.Schema;

const marketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

  },
  {
    timestamps: true
  }
);


export const marketModel = mongoose.model(config.mongo.collections.market, marketSchema);

