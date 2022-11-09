import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Login from './components/Login';
import blogService from './services/blogs';
import Notification from './components/notification/Notification';
import { showNotification } from './components/notification/notificationSlice';
import BlogsList from './components/blog/BlogsList';
import {
  loginUser,
  selectLoggedUser,
  userLoggedIn,
  userLoggedOut,
} from './components/user/usersSlice';

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(selectLoggedUser);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(userLoggedIn(user));
      blogService.setHeaderConfig(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(
        loginUser({ username, password })
      ).unwrap();
      window.localStorage.setItem('user', JSON.stringify(response));
      setUsername('');
      setPassword('');
      blogService.setHeaderConfig(response.token);
    } catch (error) {
      dispatch(showNotification(error, true));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch(userLoggedOut());
  };

  return (
    <div>
      {user === null ? (
        <Login
          submitHandler={handleLogin}
          newUsername={username}
          newUsernameHandler={({ target }) => setUsername(target.value)}
          password={password}
          newPasswordHandler={({ target }) => setPassword(target.value)}
        ></Login>
      ) : (
        <>
          <h2>blogs</h2>
          <p>{`${user.name} is logged in`}</p>
          <button id="logout-button" onClick={handleLogout}>
            Log out
          </button>
          <BlogsList></BlogsList>
        </>
      )}

      <Notification />
    </div>
  );
};

export default App;
