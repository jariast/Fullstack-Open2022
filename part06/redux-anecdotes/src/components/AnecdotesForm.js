import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const create = (event) => {
    event.preventDefault();
    const content = event.target.noteContent.value;
    event.target.noteContent.value = '';
    dispatch(createAnecdote(content));
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
