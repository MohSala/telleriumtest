export class UserServices {
    logger: any;
    mongoclient: any;
    /**
     *
     * @param {*} logger Logger Object
     * @param {*} mongoclient mongoclient Object
     */
    constructor(logger: any, mongoclient: any) {
        this.logger = logger;
        this.mongoclient = mongoclient;
      }
};