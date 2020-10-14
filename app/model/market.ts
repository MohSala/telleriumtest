import mongoose, { Model } from 'mongoose';
import { config } from '../config/config'

export interface MarketPayload {
  name: string;
  description: string;
  category: string;
  address: { type: string, coordinates: Array<number>, address: string };
  images: Array<string>;
}


const marketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    images: [{ type: String }],
    address: {
      type: {
        type: String
      },
      coordinates: {
        type: [Number]
      },
      address: {
        type: String
      }
    },

  },
  {
    timestamps: true
  }
);


export const marketModel: Model<MarketPayload> = mongoose.model<MarketPayload>(config.mongo.collections.market, marketSchema);

