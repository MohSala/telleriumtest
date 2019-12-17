import { success, failure } from '../lib/response_manager';
import { HTTPStatus } from '../constants/http_status';

export class HobbyController {
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

    createNewHobby(req: { body: { name: any; }; }, res: any){
        const { name } = req.body;
            // check if required fields were sent
        if (!name) {
            return failure(res, { message: 'Error!! pls provide password, name ,fields' }, HTTPStatus.BAD_REQUEST);
        }
        return this.userService.saveNewUser(name)
            .then((data: any) => {
                this.logger.info('data from creating user', data);
                return success(res, {
                    message: 'User created successfully',
                    response: data
                  }, HTTPStatus.CREATED)
            })
            .catch((err: any) => {
                this.logger.error('Error from creating user', err);
                return failure(res, {
                    message: 'Internal server Error',
                  }, HTTPStatus.INTERNAL_SERVER_ERROR);
            })
    }
};