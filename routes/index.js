const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFound = require('../errors/notFound');

const router = express.Router();
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFound('Порта не существует'));
});

module.exports = router;
