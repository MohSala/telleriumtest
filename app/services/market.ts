import { marketModel } from "../model/market"

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
}