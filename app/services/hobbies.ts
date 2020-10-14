
// export class HobbyServices {
//     logger: any;
//     mongoclient: any;
//     /**
//      *
//      * @param {*} logger Logger Object
//      * @param {*} mongoclient mongoclient Object
//      */
//     constructor(logger: any, mongoclient: any) {
//         this.logger = logger;
//         this.mongoclient = hobbyModel(mongoclient);
//     }

//     /**
//      * this method saves new users
//      *
//      * @param name
//      */
//      createNewHobby(param: any){
//         const { name, passionLevel, year, id } = param;
//         const hobby = new hobbyModel({
//             name,
//             passionLevel,
//             year,
//             id
//         })
//         return hobby.save();
//     };

//     getAllHobbies(id: any){
//         return hobbyModel.find(id);
//     };

//     deleteHobby(id: any){
//         return hobbyModel.remove({ _id: id });
//     }
// };