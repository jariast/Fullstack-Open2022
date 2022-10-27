import { createSlice } from '@reduxjs/toolkit';

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
    setAllAnecdotes: (stae, action) => action.payload,
  },
});

export const { voteForAnecdote, createAnecdote, setAllAnecdotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
