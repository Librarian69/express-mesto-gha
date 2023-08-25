const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные карточки' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'карточка не найдена.' });
      }
      return res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'карточка не найдена.' });
      }
      return card.deleteOne().then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'переданы некорректные данные карточки' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'карточка не найдена.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'переданы некорректные данные карточки' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'карточка не найдена.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'переданы некорректные данные карточки' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};
