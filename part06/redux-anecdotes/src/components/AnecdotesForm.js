import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const content = event.target.noteContent.value;
    event.target.noteContent.value = '';

    //I really don't like this, i think we can achieve the same result by
    //Using the notifications reducer to act upon the annecdotes/addNote action.
    //But as we're going to work on the notification in last excercise I'll leave it be.
    const newAnecdote = await dispatch(createAnecdote({ content, votes: 0 }));
    showNotification(`Created: "${newAnecdote.content}"`);
  };

  const showNotification = (msg) => {
    dispatch(setNotification(msg));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="noteContent" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdotesForm;
