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
      text: true,
      required: true
    },
    description: {
      type: String,
      text: true,
      required: true
    },
    category: {
      type: String,
      text: true,
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
        type: String,
        text: true,
      }
    },

  },
  {
    timestamps: true
  }
);

marketSchema.index({ '$**': 'text' })
export const marketModel: Model<MarketPayload> = mongoose.model<MarketPayload>(config.mongo.collections.market, marketSchema);

