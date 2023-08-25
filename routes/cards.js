const cardRouter = require('express').Router();
const {
  getCards, deleteCardById, createCard, likeCard, dislikeCard
} = require('../controllers/cards');

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', deleteCardById);

cardRouter.post('/', createCard);

cardRouter.put('/:cardId/likes', likeCard);

cardRouter.delete('/:cardId/likes', dislikeCard);

cardRouter.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = cardRouter;
