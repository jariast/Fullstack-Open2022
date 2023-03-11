import { useQuery } from '@apollo/client';
import { BOOK_BY_GENRE, GET_USER_INFO } from '../queries';

const Recommendations = ({ show, token }) => {
  const { data, loading } = useQuery(GET_USER_INFO, { skip: !token });
  const { data: booksData, loading: loadingBooks } = useQuery(BOOK_BY_GENRE, {
    skip: !data,
    variables: { genre: data?.me.favouriteGenre },
  });

  // This is only needed for Client Side Filtering.
  // const [filteredBooks, setFilteredBooks] = useState([]);

  // useEffect(() => {
  //   if (booksData?.allBooks && data?.me) {
  //     setFilteredBooks(
  //       filterByGenre(booksData.allBooks, data.me.favouriteGenre)
  //     );
  //   }
  // }, [booksData, data]);

  if (!show) {
    return null;
  }

  if (loading && loadingBooks) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <h3>Books based in your fav Genre: {data.me.favouriteGenre}</h3>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul></ul>
    </div>
  );
};

export { Recommendations };
