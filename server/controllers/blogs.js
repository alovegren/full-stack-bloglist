const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { name: 1, username: 1 });

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if (!(request.token && request.token.id)) {
    return response.status(401).json({ error: 'missing or invalid token'});
  }
  
  const blog = new Blog(request.body);
  blog.user = request.user._id;
  const newBlog = await blog.save();

  request.user.blogs = request.user.blogs.concat(newBlog._id);
  await request.user.save();

  response.status(201).json(newBlog);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  if (!(request.token && request.token.id)) {
    return response.status(401).json({ error: 'missing token'});
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (!blogToDelete) {
    return response.status(204).end();
  }

  if (request.user._id.toString() !== blogToDelete.user.toString()) {
    return response.status(401).json({ 
      error: 'only the blog creator can delete a blog'
    });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body
  );

  response.json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const { title, author, url, likes } = blog;
  const commentedBlog = {
    title, author, url, likes,
    comments: blog.comments.concat(request.body.comment)
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    commentedBlog,
    { new: true }
  );

  response.json(updatedBlog);
});

module.exports = blogsRouter;

// {
//   comments: [ ],
//   title: "dis one",
//   author: "sertres",
//   url: "reysrey",
//   likes: 4,
//   user: {
//   username: "nub with a token",
//   name: "msi",
//   id: "624c654679c04be66194c7f9"
//   },
//   id: "624da78cc8fa8d4d8b106ef1"
//   },