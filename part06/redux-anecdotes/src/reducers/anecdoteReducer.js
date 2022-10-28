import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';
import { showNotification } from './notificationReducer';

export const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updatedAnecdote: (state, action) => {
      const updatedAnecdote = action.payload;

      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },
    addAnecdote: (state, action) => {
      const newAnecdote = action.payload;
      return state.concat(newAnecdote);
    },
    loadedAllAnecdotes: (state, action) => action.payload,
  },
});

export const { updatedAnecdote, addAnecdote, loadedAllAnecdotes } =
  anecdotesSlice.actions;

export const loadAllAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(loadedAllAnecdotes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(anecdote);
    dispatch(addAnecdote(newAnecdote));
    dispatch(showNotification(`Created "${newAnecdote.content}"`));
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteCopy = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await anecdotesService.updateAnecdote(anecdoteCopy);
    dispatch(updatedAnecdote(response));
    dispatch(showNotification(`You voted for "${response.content}"`));
  };
};

export default anecdotesSlice.reducer;
