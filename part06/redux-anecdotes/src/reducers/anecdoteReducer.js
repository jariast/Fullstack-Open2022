import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

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
    //I'm pretty sure this is not the best practice to do this.
    return newAnecdote;
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteCopy = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await anecdotesService.updateAnecdote(anecdoteCopy);
    dispatch(updatedAnecdote(response));
    return response;
  };
};

export default anecdotesSlice.reducer;
