import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import BlogForm from './components/BlogsForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [isNotificationError, setIsNotificationError] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await loginService.login(username, password);
      setUser(loginResponse);
      window.localStorage.setItem('user', JSON.stringify(loginResponse));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('Login error', error);
      showNotification(error.response.data.error, true);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const showNotification = (msg, isError) => {
    setNotificationMsg(msg);
    setIsNotificationError(isError);
    setTimeout(() => {
      setNotificationMsg('');
    }, 3000);
  };

  const handleBlogCreation = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.createBlog(user.token, newBlog);

      setBlogs(blogs.concat(createdBlog));
      showNotification(
        `A new blog "${createdBlog.title}" by ${createdBlog.author} added`
      );
    } catch (error) {
      console.log('Blog creation error', error);
      showNotification(error.response.data.error, true);
    }
  };

  const blogsList = () => (
    <>
      <h2>blogs</h2>
      <p>{`${user.name} is logged in`}</p>
      <button onClick={handleLogout}>Log out</button>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm addBloghandler={handleBlogCreation}></BlogForm>
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

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
        blogsList()
      )}

      <Notification message={notificationMsg} isError={isNotificationError} />
    </div>
  );
};

export default App;
