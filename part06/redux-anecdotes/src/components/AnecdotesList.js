import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => {
    //NB: We were actually mutating the state in the previous implementation
    // state.sort modifies the array.
    const anecdotesCopy = [...state.anecdotes];

    return anecdotesCopy.sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(voteForAnecdote(anecdote.id));
    showNotification(`You voted for: "${anecdote.content}"`);
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
