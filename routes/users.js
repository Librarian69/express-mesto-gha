const { celebrate, Joi } = require('celebrate');

const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser
} = require('../controllers/users');
const { validateUrl } = require('../middlewares/validation');

userRouter.get('/', getUsers);

userRouter.get('/me', getCurrentUser);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
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

module.exports = userRouter;
