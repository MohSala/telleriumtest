import { marketModel } from "../model/market"
import axios from "axios"
import { config } from "../config/config"

export class MarketService {
  logger: any;
  mongoclient: any;
  /**
   *
   * @param {*} logger Logger Object
   * @param {*} mongoclient mongoclient Object
   */
  constructor(logger: any, mongoclient: any) {
    this.logger = logger;
    this.mongoclient = marketModel(mongoclient);
  }

  async saveMarket(param: any) {
    const { name, description, category, address } = param;
    const getCoordinates = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.google.api_key}`, {});
    const locationObj = getCoordinates.data.results[0].geometry.location
    const newMarket = new marketModel({
      name,
      description,
      category,
      address: {
        type: "Point",
        coordinates: [locationObj.lng, locationObj.lat],
        address
      }
    })
    return newMarket.save();
  }

  public async uploadImage(id: string, image: any) {
    return marketModel.findOneAndUpdate({ _id: id }, { images: image }, { new: true }).exec();
  }
}