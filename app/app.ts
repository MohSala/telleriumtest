import express from 'express';

import { userRouter } from './routes/user';
import { hobbyRouter } from './routes/hobby';
import { config } from './config/config';
// service locator via dependency injection
import { serviceLocate } from './config/di';

export const app = express();
const port = config.server.port;

app.use('/', userRouter);
app.use('/', hobbyRouter);
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

// module.exports = app;