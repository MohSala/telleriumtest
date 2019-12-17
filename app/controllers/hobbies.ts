import { success, failure } from '../lib/response_manager';
import { HTTPStatus } from '../constants/http_status';

export class HobbyController {
    logger: any;
    hobbyService: any;
    /**
     *
     * @param {*} logger Logger Object
     * @param {*} hobbyService hobbyService Object
     */
    constructor(logger: any, hobbyService: any) {
        this.logger = logger;
        this.hobbyService = hobbyService;
    }

    async createNewHobby(req: { body: { name: any; passionLevel: any; year: any; id: any}; }, res: any){
        const { name, passionLevel, year, id } = req.body;

            // check if required fields were sent
        if (!name || !passionLevel || !year || !id) {
            return failure(res, { message: 'Error!! pls provide name, passionLevel, year, id, fields' }, HTTPStatus.BAD_REQUEST);
        };

        // validation for hobby
        console.log('passionLevel', passionLevel)
        if(passionLevel !== "Low" && passionLevel !== "High" && passionLevel !== "Medium" && passionLevel !== "Very-High"){
            return failure(res, { message: 'Error!! hobby should be High or Medium or Low or Very-High' }, HTTPStatus.BAD_REQUEST);
        };
        const param = {
            name, passionLevel, year, id
        };
        try {
            const data = await this.hobbyService.createNewHobby(param)
            this.logger.info('data from creating hobby', data);
            return success(res, {
                message: 'Hobby created successfully',
                response: data
              }, HTTPStatus.CREATED)
        } catch(err) {
            this.logger.error('Error from creating hobby', err);
            return failure(res, {
                message: 'Internal server Error',
              }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async getAllHobbies(req: any, res: any){
        const { id } = req.query;
        // check if required fields were sent
        if (!id) {
            return failure(res, { message: 'Error!! pls provide id field' }, HTTPStatus.BAD_REQUEST);
        }
        const param = {
            id
        };

        try {
            const data = await this.hobbyService.getAllHobbies(param);
            this.logger.info('All hobby data gotten successfully', data);
            if(data.length === 0){
                return success(res, {
                    message: 'No hobby data found',
                    response: data
                  }, HTTPStatus.NOT_FOUND)
            }
            return success(res, {
                message: 'Hobby created successfully',
                response: data
              }, HTTPStatus.OK);
        } catch (err){
            this.logger.error('Unable to get all hobbies', err);
            return failure(res, {
                message: 'Internal server Error',
              }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleleHobby(req: any, res: any){
        const { id } = req.query
        try {
            const data = await this.hobbyService.deleteHobby(id);
            this.logger.info('Data deleted', data);
            if(data.n === 0){
                return success(res, {
                    message: 'No hobby data to delete',
                  }, HTTPStatus.NOT_FOUND)
            }
            return success(res, {
                message: 'Data deleted successfully',
              }, HTTPStatus.OK);
        } catch (err){
            this.logger.error('Unable to delete hobby', err);
            return failure(res, {
                message: 'Internal server Error',
              }, HTTPStatus.INTERNAL_SERVER_ERROR);
        };
    }
};