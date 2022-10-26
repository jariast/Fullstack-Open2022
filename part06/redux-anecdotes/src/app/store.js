import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from '../reducers/anecdoteReducer';

export default configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
  },
});
