import { configureStore } from '@reduxjs/toolkit';

import bloglistReducer from './reducers/bloglistReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    bloglist: bloglistReducer,
    users: usersReducer,
    user: userReducer,
    notification: notificationReducer,
  }
});

export default store;