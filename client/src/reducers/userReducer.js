import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';
import loginService from '../services/login';

import { flashNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;

export const initializeLoggedInUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const logUserIn = (credentials) => {
  return async dispatch => {
    try {
      const userLoginData = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(userLoginData)
      );

      blogService.setToken(userLoginData.token);
      dispatch(setUser(userLoginData));
    } catch (error) {
      dispatch(flashNotification(
        'Username or password is incorrect',
        'error'
      ));
    }
  };
};

export const logUserOut = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;

// setNotification('Username or password is incorrect');
// hideNotification();