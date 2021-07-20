const express = require('express');
const apiRouter = express.Router();

const restaurantsRouter = require('./restaurants');
apiRouter.use('/restaurants', restaurantsRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const queueRouter = require('./queue');
apiRouter.use('/queue', queueRouter);

module.exports = apiRouter;
