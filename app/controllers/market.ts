

export class MarketController {
  logger: any;
  marketService: any;
  /**
   *
   * @param {*} logger Logger Object
   * @param {*} marketService marketService Object
   */
  constructor(logger: any, marketService: any) {
    this.logger = logger;
    this.marketService = marketService;
  }
}