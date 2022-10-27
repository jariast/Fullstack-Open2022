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
    createAnecdote: (state, action) => {
      const newAnecdote = action.payload;
      return state.concat(newAnecdote);
    },
    setAllAnecdotes: (state, action) => action.payload,
  },
});

export const { voteForAnecdote, createAnecdote, setAllAnecdotes } =
  anecdotesSlice.actions;

export const loadAllAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAllAnecdotes(anecdotes));
  };
};

export default anecdotesSlice.reducer;
