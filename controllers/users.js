const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные пользователя' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'переданы некорректные данные пользователя' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные пользователя' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const avatar = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные пользователя' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};
