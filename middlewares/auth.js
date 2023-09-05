const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(res
      .status(401)
      .send({ message: 'Необходима авторизация' }));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return next(res
      .status(401)
      .send({ message: 'Необходима авторизация' }));
  }

  req.user = payload;

  return next();
};
