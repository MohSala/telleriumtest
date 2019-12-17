import { success, failure } from '../lib/response_manager';
import { HTTPStatus } from '../constants/http_status';

export class UserController {
    logger: any;
    userService: any;
    /**
     *
     * @param {*} logger Logger Object
     * @param {*} userService userService Object
     */
    constructor(logger: any, userService: any) {
        this.logger = logger;
        this.userService = userService;
    }

    async createNewUser(req: { body: { name: any; }; }, res: any){
        const { name } = req.body;
            // check if required fields were sent
        if (!name) {
            return failure(res, { message: 'Error!! pls provide password, name ,fields' }, HTTPStatus.BAD_REQUEST);
        }
        try {
            const data = await this.userService.saveNewUser(name);
            this.logger.info('data from creating user', data);
                return success(res, {
                    message: 'User created successfully',
                    response: data
                  }, HTTPStatus.CREATED);
        } catch(err) {
            this.logger.error('Error from creating user', err);
            return failure(res, {
                message: 'Internal server Error',
              }, HTTPStatus.INTERNAL_SERVER_ERROR);
        };
    }

    async getAllUsers(req: any, res: any){
        try {
            const data = await this.userService.getAllUsers();
            console.log('data gott', data)
            if(data.length === 0){
                return success(res, {
                    message: 'No user data found',
                    response: data
                  }, HTTPStatus.NOT_FOUND);
            };
            this.logger.info('data from getting all users', data);
            return success(res, {
                message: 'User data gotten successfully',
                response: data
              }, HTTPStatus.OK)
        } catch(err) {
            this.logger.error('Error from creating user', err);
            return failure(res, {
                message: 'Internal server Error',
              }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }
};