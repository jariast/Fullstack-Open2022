import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../components/notification/notificationSlice';
import blogsReducer from '../components/blog/blogsSlice';
import usersReducer from '../components/user/usersSlice';

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    users: usersReducer,
  },
});
