import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/notification/Notification';
import { showNotification } from './components/notification/notificationSlice';
import BlogsList from './components/blog/BlogsList';

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setHeaderConfig(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await loginService.login(username, password);
      setUser(loginResponse);
      window.localStorage.setItem('user', JSON.stringify(loginResponse));
      setUsername('');
      setPassword('');
      blogService.setHeaderConfig(loginResponse.token);
    } catch (error) {
      console.log('Login error', error);
      dispatch(showNotification(error.response.data.error, true));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
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
          <BlogsList user={user}></BlogsList>
        </>
      )}

      <Notification />
    </div>
  );
};

export default App;
