const userRouter = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/:userId', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);

userRouter.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
module.exports = userRouter;
