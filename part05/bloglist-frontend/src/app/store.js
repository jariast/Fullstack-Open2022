import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../components/notification/notificationSlice';

export default configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
