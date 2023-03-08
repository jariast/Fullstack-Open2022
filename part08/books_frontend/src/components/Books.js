import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_GENRES, BOOK_BY_GENRE } from '../queries';
import { filterByGenre } from '../Utils/utils';

const Books = (props) => {
  const { data, loading, refetch } = useQuery(BOOK_BY_GENRE, {
    variables: { genre: null },
  });
  const { data: genres } = useQuery(ALL_GENRES);
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
        {genres.allGenres.map((genre) => (
          <button key={genre} onClick={() => refetch({ genre })}>
            {genre}
          </button>
        ))}

        <button onClick={() => refetch({ genre: null })}>All Genres</button>
      </ul>
    </div>
  );
};

export default Books;
