const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash
    })
      .then((user) => res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(res.status(400).send({ message: 'переданы некорректные данные пользователя' }));
        } else if (err.code === 11000) {
          next(res.status(401).send({ message: 'Пользователь с таки Email уже существует' }));
        } else {
          next(err);
        }
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw res.status(401).send({ message: 'переданы некорректные данные пользователя' });
      }
      return bcrypt.compare(password, user.password).tnen((match) => {
        if (!match) {
          throw res.status(401).send({ message: 'переданы некорректные данные пользователя' });
        }
        const tocen = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
        return res.send({ tocen });
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(400).send({ message: 'переданы некорректные данные пользователя' }));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        throw res.status(404).send({ message: 'пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw res.status(404).send({ message: 'пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(400).send({ message: 'переданы некорректные данные пользователя' }));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw res.status(404).send({ message: 'пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw res.status(404).send({ message: 'пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(400).send({ message: 'переданы некорректные данные пользователя' }));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const avatar = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw res.status(404).send({ message: 'пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(400).send({ message: 'переданы некорректные данные пользователя' }));
      } else {
        next(err);
      }
    });
};
