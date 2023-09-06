const jwt = require('jsonwebtoken');
const Unauthrized = require('../errors/unauthrized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new Unauthrized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return next(new Unauthrized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
