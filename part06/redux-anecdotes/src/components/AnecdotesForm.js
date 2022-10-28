import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdotesForm = (props) => {
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.noteContent.value;
    event.target.noteContent.value = '';

    props.createAnecdote({ content, votes: 0 });
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

export default connect(null, { createAnecdote })(AnecdotesForm);
