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
     * @param name
     */
    saveNewUser(name: any){
        const user = new userModel({
            "name": name
        })
        return user.save();
    }

    /**
     * this method gets new users
     *
     * @param name
     */
    getAllUsers(){
        return userModel.find();
    };
};