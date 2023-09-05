const { celebrate, Joi } = require('celebrate');

const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser
} = require('../controllers/users');
const { validateUrl } = require('../middlewares/validation');

userRouter.get('/', getUsers);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex()
  })
}), getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
}), updateProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(validateUrl)
  })
}), updateAvatar);

userRouter.get('/me', getCurrentUser);

userRouter.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
module.exports = userRouter;
