const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');

const router = express.Router();
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
