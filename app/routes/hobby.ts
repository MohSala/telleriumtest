import express = require('express');
import bodyParser = require('body-parser');
import { serviceLocate } from '../config/di';

const hobbyController = serviceLocate.get('hobbyController');

export const hobbyRouter = express.Router();

hobbyRouter.use(bodyParser.json());
hobbyRouter.use(bodyParser.urlencoded({ extended: false }));

// Add an hobby
hobbyRouter.post('/hobby', (req, res) => {
    return hobbyController.createNewHobby(req, res);
});

// get all hobbies per user
hobbyRouter.get('/hobby', (req, res) => {
    return hobbyController.getAllHobbies(req, res);
});

// delete hobby
hobbyRouter.delete('/hobby', (req, res) => {
    return hobbyController.deleleHobby(req, res);
});