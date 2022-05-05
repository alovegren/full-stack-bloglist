const User = require('../models/user');
const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  let encodedToken;

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const TOKEN_START_IDX = 7;
    encodedToken = authorization.slice(TOKEN_START_IDX);
    request.token = jwt.verify(encodedToken, process.env.SECRET);
  }

  next();
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const user = await User.findById(request.token.id);
    request.user = user;
  }

  next();
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
}

module.exports = { errorHandler, tokenExtractor, userExtractor }