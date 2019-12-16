export class UserController {
    logger: any;
    userService: any;
    /**
     *
     * @param {*} logger Logger Object
     * @param {*} mongoclient mongoclient Object
     */
    constructor(logger: any, userService: any) {
        this.logger = logger;
        this.userService = userService;
      }
};