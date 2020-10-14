import express = require('express');
import bodyParser = require('body-parser');
import { serviceLocate } from '../config/di';

const userController = serviceLocate.get('userController');
const marketController = serviceLocate.get('marketController');

export const userRouter = express.Router();

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: false }));

// Add a user
userRouter.post('/user', (req, res) => {
    return userController.createNewUser(req, res);
});

userRouter.post('/market', (req, res) => {
    return marketController.addMarket(req, res);
});

userRouter.post('/market/uploadImages/:id', (req, res) => {
    return marketController.uploadProductsImages(req, res);
});

// get all users
userRouter.get('/user', (req, res) => {
    return userController.getAllUsers(req, res);
});
