import { useState } from 'react';

import useLocalStorageState from './hooks/useLocalStorage';

import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import { useApolloClient } from '@apollo/client';
import { Recommendations } from './components/Recommendations';
import { useSubscription } from '@apollo/client';
import { BOOK_ADDED } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [error, setError] = useState('');
  const [token, setToken] = useLocalStorageState('books-app-user-token', null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert('Book added', data);
    },
  });

  const handleLogin = (token) => {
    setToken(token);
    setPage('authors');
  };

  const handleLogout = () => {
    setToken(null);
    client.resetStore(); //This purges the cache in case we have sensitive info in it.
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>book</button>}
        {token && (
          <button onClick={() => setPage('recommendations')}>
            recommendations
          </button>
        )}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} token={token} />

      <Login
        show={page === 'login'}
        setError={setError}
        handleLogin={handleLogin}
      />

      {error && <h2>{error}</h2>}
    </div>
  );
};

export default App;
