const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!(username && password)) {
    return response.status(400).json({ 
      error: 'both username and password are required'
    });
  } else if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ 
      error: 'both username and password need to be at least three characters long'
    });
  } else {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({ 
        error: 'sorry, that username is already taken'
      });
    }
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash
  });

  const newUser = await user.save();
  response.status(201).json(newUser);
});

module.exports = usersRouter;