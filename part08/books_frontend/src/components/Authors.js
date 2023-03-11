import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, SET_AUTHOR_BIRTH } from '../queries';

const Authors = (props) => {
  const { data, loading } = useQuery(ALL_AUTHORS);
  const [authorName, setAuthorName] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const [editAuthorBirth] = useMutation(SET_AUTHOR_BIRTH);

  const editAuthor = (event) => {
    event.preventDefault();
    editAuthorBirth({
      variables: { name: authorName, setBornTo: parseInt(birthYear) },
    });

    setAuthorName('');
    setBirthYear('');
  };

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Edit Birthyear</h2>
      <form onSubmit={editAuthor}>
        <select
          value={authorName}
          onChange={({ target }) => setAuthorName(target.value)}
        >
          <option value="">---Please select an author--</option>
          {data.allAuthors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          <label>Birth Year</label>
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">Modify author</button>
      </form>
    </div>
  );
};

export default Authors;
