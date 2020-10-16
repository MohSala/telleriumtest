import { success, failure } from '../lib/response_manager';
import { HTTPStatus } from '../constants/http_status';
import { UserPayload } from '../model/user';
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
import { config } from '../config/config'

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

    async createNewUser(req: { body: { email: UserPayload, password: UserPayload }; }, res: any) {
        const { email, password } = req.body;
        // check if required fields were sent
        console.log(req.body)
        if (!email || !password) {
            return failure(res, { message: 'Error!! pls provide password, email ,fields' }, HTTPStatus.BAD_REQUEST);
        }
        try {
            const checkForUser = await this.userService.checkForCreatedUser(email);
            if (checkForUser !== null) {
                return failure(res, { message: 'Sorry this user already exists!' }, HTTPStatus.BAD_REQUEST);
            }
            else {
                const salt: String = await bcrypt.genSalt(10);
                const hash: String = await bcrypt.hash(password, salt)
                const data: UserPayload = await this.userService.saveNewUser(email, hash);
                const token = await jwt.sign({ email, role: data.role }, config.secretKey, { expiresIn: '14d' })
                this.logger.info('data from creating user', data);
                return success(res, {
                    message: 'User created successfully',
                    response: { data, token }
                }, HTTPStatus.CREATED);
            }
        } catch (err) {
            this.logger.error('Error from creating user', err);
            return failure(res, {
                message: 'Internal server Error',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        };
    }

    async login(req: any, res: any) {
        let { email, password } = req.body;
        try {

            if (!email || !password) {
                return failure(res, {
                    message: 'Please fill in Email and Password Field',
                }, HTTPStatus.BAD_REQUEST);
            }
            const data: UserPayload = await this.userService.findOne(email)
            if (!data) {
                return failure(res, { message: 'Invalid Credentials' },
                    HTTPStatus.BAD_REQUEST);
            }
            const match = await bcrypt.compare(password, data.password)
            if (!match) {
                return failure(res, { message: 'Invalid credentials' },
                    HTTPStatus.BAD_REQUEST);
            }
            else {

                const token = await jwt.sign({ email, role: data.role }, config.secretKey, { expiresIn: '14d' })
                return success(res, {
                    message: 'User Signed in Successfully',
                    response: { data, token },
                }, HTTPStatus.OK);
            }
        } catch (error) {
            this.logger.info("Error Occured during signin ", error)
            return failure(res, {
                message: 'Sorry an internal server error occured',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllUsers(req: any, res: any) {
        try {
            const data = await this.userService.getAllUsers();
            if (data.length === 0) {
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
        } catch (err) {
            this.logger.error('Error from creating user', err);
            return failure(res, {
                message: 'Internal server Error',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }
};