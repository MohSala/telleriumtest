import express = require('express');
import bodyParser = require('body-parser');
import { serviceLocate } from '../config/di';

const userController = serviceLocate.get('userController');
const hobbyController = serviceLocate.get('hobbyController');

export const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Add a talk
router.post('/user', (req, res) => {
    return userController.createNewUser(req, res);
});

router.post('/hobby', (req, res) => {
    return hobbyController.createNewHobby(req, res);
});