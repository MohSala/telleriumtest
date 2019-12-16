import express = require('express');
import bodyParser = require('body-parser');

export const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Add a talk
router.get('/test', (req, res) => {
    return res.send({
        test: "done"
    })
});