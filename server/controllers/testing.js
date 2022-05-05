const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.post('/reset', async (_request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).send({ message: 'the post route at /reset was routed' });
});

module.exports = router;