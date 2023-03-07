import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../queries';
import { filterByGenre } from '../Utils/utils';

const Books = (props) => {
  const { data, loading } = useQuery(ALL_BOOKS);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredBooks(filterByGenre(data.allBooks));
    }
  }, [data]);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading</div>;
  }

  const allBooks = data.allBooks;

  const genres = extractGenres(data.allBooks);
  genres.push('All genres');

  function extractGenres(books = []) {
    const bookGenres = books.map((book) => book.genres).flat();
    const uniqueGenres = [...new Set(bookGenres)];

    return uniqueGenres;
  }

  function handleFilterClick(genre) {
    setFilteredBooks(filterByGenre(allBooks, genre));
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleFilterClick(genre)}>
            {genre}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Books;
