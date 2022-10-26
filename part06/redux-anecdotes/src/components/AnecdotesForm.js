import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const create = (event) => {
    event.preventDefault();
    const content = event.target.noteContent.value;
    event.target.noteContent.value = '';
    dispatch(createAnecdote(content));
    showNotification(`Created: "${content}"`);
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
