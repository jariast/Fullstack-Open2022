import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import blogService from './services/blogs';
import Notification from './components/notification/Notification';
import { showNotification } from './components/notification/notificationSlice';
import BlogsList from './components/blog/BlogsList';
import {
  fetchUsers,
  loginUser,
  selectLoggedUser,
  userLoggedIn,
} from './components/user/usersSlice';
import UsersList from './components/user/UsersList';
import User from './components/user/User';
import { fetchBlogs } from './components/blog/blogsSlice';
import SingleBlog from './components/blog/SingleBlog';
import NavBar from './components/Navbar';
import { Container } from 'react-bootstrap';

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

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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

  return (
    <Container>
      {user === null ? (
        <Login
          submitHandler={handleLogin}
          newUsername={username}
          newUsernameHandler={({ target }) => setUsername(target.value)}
          password={password}
          newPasswordHandler={({ target }) => setPassword(target.value)}
        ></Login>
      ) : (
        <Router>
          <h2>Blogs App</h2>
          <NavBar />
          <Routes>
            <Route path="/users/:userId" element={<User />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/blogs/:blogId" element={<SingleBlog />} />
            <Route path="/blogs" element={<BlogsList />} />
            <Route path="/" element={<BlogsList />} />
          </Routes>
        </Router>
      )}

      <Notification />
    </Container>
  );
};

export default App;
