import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../components/notification/notificationSlice';
import blogsReducer from '../components/blog/blogsSlice';

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
});
