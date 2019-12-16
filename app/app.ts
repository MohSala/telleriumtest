import express from 'express';

import { router } from './routes/index.js';
import { config } from './config/config';
// service locator via dependency injection
import { serviceLocate } from './config/di';
// import { serviceLocator } from './lib/service_locator';

const app = express();
const port = 3000;

app.use('/', router);
app.get('/', (req, res) => {
  res.send('Welcome to API!');
});


// Connect to mongodb
serviceLocate.get('mongo');

// Connect to logger
const logger = serviceLocate.get('logger');

app.listen(port, () => {
    logger.info(`${config.appName} is listening on port: ${port}`)
});

module.exports = app;