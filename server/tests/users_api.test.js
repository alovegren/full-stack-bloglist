const mongoose = require('mongoose');
const helper = require('./test_helper.js');
const supertest = require('supertest');
const app = require('../app');
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
});

describe('when an invalid user is created', () => {
  test('a user without a username is rejected', async () => {
    const user = {
      name: "missy",
      password: "secret",
    }

    const response = await api
      .post('/api/users')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'both username and password are required'
    );
  });

  test('a user without a password is rejected', async () => {
    const user = {
      name: "missy",
      username: "chaton60",
    }

    const response = await api
      .post('/api/users')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'both username and password are required'
    );
  });

  test('a user with username less than three characters is rejected', async () => {
    const user = {
      name: "missy",
      username: "ch",
      password: "secret",
    }

    const response = await api
    .post('/api/users')
    .send(user);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'both username and password need to be at least three characters long'
    );
  });

  test('a user with password less than three characters is rejected', async () => {
    const user = {
      name: "missy",
      username: "chaton60",
      password: "se",
    }
    
    const response = await api
      .post('/api/users')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'both username and password need to be at least three characters long'
    );
  });

  test('a user with username already taken is rejected', async () => {
    const user = helper.users[0]
    const response = await api
      .post('/api/users')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'sorry, that username is already taken'
    )
  });
});

afterAll(() => {
  mongoose.connection.close();
});