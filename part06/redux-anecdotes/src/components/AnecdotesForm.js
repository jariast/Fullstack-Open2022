import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const content = event.target.noteContent.value;
    event.target.noteContent.value = '';
    const newAnecdote = await anecdotesService.createAnecdote({
      content,
      votes: 0,
    });
    dispatch(createAnecdote(newAnecdote));
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
