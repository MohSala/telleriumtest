import { userModel } from '../model/user';

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
        this.mongoclient = userModel(mongoclient);
    }

    /**
     * this method saves new users
     *
     * @param email
     * @param password
     */
    saveNewUser(email: string, password: string) {
        const user = new userModel({
            email,
            password
        })
        return user.save();
    }

    checkForCreatedUser(email: string) {
        return userModel.findOne({ email }).exec();
    }

    async findOne(email: string) {
        return userModel.findOne({ email })
    }

    /**
     * this method gets new users
     *
     * @param name
     */
    getAllUsers() {
        return userModel.find();
    };
};