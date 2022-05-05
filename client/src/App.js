import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Nav from './components/Nav';
import Home  from './components/Home';
import BlogPage from './components/BlogPage';
import Login from './components/Login';
import Notification from './components/Notification';
import User from './components/User';
import Users from './components/Users';

import { initializeBloglist } from './reducers/bloglistReducer';
import { initializeUsers }  from './reducers/usersReducer';
import { initializeLoggedInUser, logUserIn } from './reducers/userReducer';

import { Route, Routes, useMatch } from 'react-router-dom';

import Container from '@mui/material/Container';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const blogs = useSelector(state => state.bloglist);
  const currentUser = useSelector(state => state.user);
  const notification = useSelector(state => state.notification);

  useEffect(() => {
    dispatch(initializeBloglist());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeLoggedInUser());
  }, [dispatch]);

  const handleLogin = (credentials) => {
    dispatch(logUserIn(credentials));
  };

  const userMatch = useMatch('/users/:id');
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null;

  if (currentUser === null) {
    return (
      <Container>
        <Notification message={notification.message} tone={notification.tone} />
        <Login logUserIn={handleLogin} />
      </Container>
    );
  }

  return (
    <Container>
      <Notification message={notification.message} tone={notification.tone} />
      <Nav currentUser={currentUser} />

      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/blogs/:id" element={<BlogPage blog={blog} />} />
      </Routes>
    </Container>
  );
};

export default App;