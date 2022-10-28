import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllAnecdotes, voteForAnecdote } from '../reducers/anecdoteReducer';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => {
    //NB: We were actually mutating the state in the previous implementation
    // state.sort modifies the array.
    // const anecdotesCopy = [...state.anecdotes];

    const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    );

    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllAnecdotes());
  }, [dispatch]);

  const vote = async (anecdote) => {
    console.log('vote', anecdote.id);
    const updatedAnecdote = await dispatch(voteForAnecdote(anecdote));
    showNotification(`You voted for: "${updatedAnecdote.content}"`);
  };

  const showNotification = (msg) => {
    dispatch(setNotification(msg));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdotesList;
