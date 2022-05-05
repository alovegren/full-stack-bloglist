const mongoose = require('mongoose');
const helper = require('./test_helper.js');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const creatingUsers = helper.users.map(user => (
    api
      .post('/api/users')
      .send(user)
  ));

  await Promise.all(creatingUsers);

  await Blog.deleteMany({});

  const validUser = await api
      .post('/api/login')
      .send({ "username": "fearlessNub2523", "password": "sunshineN@PS"});

  const token = validUser.body.token;


  const creatingBlogs = helper.blogs.map(blog => (
    api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: `bearer ${token}` })
  ));

  await Promise.all(creatingBlogs);
  const blogs = await helper.retrieveBlogsFromDb();
});

describe('when retrieving blogs', () => {
  test('all blog posts are fetched', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.blogs.length);
  }, 10000);
  
  test("id property of blog posts is named 'id'", async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  }, 10000);
});

describe('when creating a new blog post', () => {
  test('a valid post request successfully creates a new blog post', async () => {
    const validUser = await api
      .post('/api/login')
      .send({ "username": "fearlessNub2523", "password": "sunshineN@PS"});

    const token = validUser.body.token;
    
    await api
      .post('/api/blogs')
      .send(helper.singleBlog)
      .set({ Authorization: `bearer ${token}` });
  
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.blogs.length + 1);
  }, 10000);
  
  test("if the likes property is missing from a post request, a 'likes' property will be defined on the returned blog object with a value of 0", async () => {
    const validUser = await api
      .post('/api/login')
      .send({ "username": "fearlessNub2523", "password": "sunshineN@PS"});

    const token = validUser.body.token
    
    await api
      .post('/api/blogs')
      .send(helper.singleBlog)
      .set({ Authorization: `bearer ${token}` });
  
    const response = await api.get('/api/blogs');
    const receivedBlogs = response.body;
    const newReceivedBlog = receivedBlogs[receivedBlogs.length - 1];
  
    expect(newReceivedBlog.likes).toBe(0);
  }, 10000);
  
  test('if title and url properties are missing from a new blog post, the server responds with a 400 error', async () => {
    const validUser = await api
      .post('/api/login')
      .send({ "username": "fearlessNub2523", "password": "sunshineN@PS"});

    const token = validUser.body.token
    
    const response = await api
      .post('/api/blogs')
      .send({ author: "Missy" })
      .set({ Authorization: `bearer ${token}` });
  
    expect(response.status).toBe(400);
  }, 10000);
});

describe('when deleting a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const initialBlogs = await helper.retrieveBlogsFromDb();
    const blogForDeletion = initialBlogs[0];
    
    const validUser = await api
      .post('/api/login')
      .send({ "username": "fearlessNub2523", "password": "sunshineN@PS"});

    const token = validUser.body.token
    
    await api
      .delete(`/api/blogs/${blogForDeletion.id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length - 1); 

    const idsOfRemainingBlogs = response.body.map(blog => blog.id);
    expect(idsOfRemainingBlogs).not.toContain(blogForDeletion.id);
  }, 10000);
});

describe('when updating a blog post', () => {
  test('the amount of likes reflects the new value', async () => {
    const initialBlogs = await helper.retrieveBlogsFromDb();
    const blogToUpdate = initialBlogs[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 50 });

    const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`);
    expect(updatedBlog.body.likes).toBe(50);
  });
});

afterAll(() => {
  mongoose.connection.close();
});