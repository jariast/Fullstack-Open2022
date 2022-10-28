import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

export const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote: (state, action) => {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);

      const newAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id === newAnecdote.id ? newAnecdote : anecdote
      );
    },
    addAnecdote: (state, action) => {
      const newAnecdote = action.payload;
      return state.concat(newAnecdote);
    },
    loadedAllAnecdotes: (state, action) => action.payload,
  },
});

export const { voteForAnecdote, addAnecdote, loadedAllAnecdotes } =
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

export default anecdotesSlice.reducer;
