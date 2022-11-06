import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import Blog from './components/blog/Blog';
import BlogForm from './components/blogsForm/BlogsForm';
import Notification from './components/notification/Notification';
import { showNotification } from './components/notification/notificationSlice';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const sortByLikes = (blog1, blog2) => blog2.likes - blog1.likes;

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(sortByLikes)));
  }, []);

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

  const handleBlogCreation = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.createBlog(user.token, newBlog);

      setBlogs(blogs.concat(createdBlog));

      dispatch(
        showNotification(
          `A new blog "${createdBlog.title}" by ${createdBlog.author} added`
        )
      );
    } catch (error) {
      console.log('Blog creation error', error);
      dispatch(showNotification(error.response.data.error, true));
    }
  };

  const handleBlogLike = async (blogToLike) => {
    try {
      const updatedBlog = await blogService.updateLikes(
        blogToLike.id,
        blogToLike
      );
      setBlogs(
        blogs
          .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
          .sort(sortByLikes)
      );
    } catch (error) {
      console.log('Blog liking error', error);
    }
  };

  const handleBlogDeletion = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.log('Error Deleting blog', error);
      dispatch(showNotification(error.response.data.error, true));
    }
  };

  const blogsList = () => (
    <>
      <h2>blogs</h2>
      <p>{`${user.name} is logged in`}</p>
      <button id="logout-button" onClick={handleLogout}>
        Log out
      </button>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm addBloghandler={handleBlogCreation}></BlogForm>
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogHandler={handleBlogLike}
          user={user}
          deleteBlogHandler={handleBlogDeletion}
        />
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

      <Notification />
    </div>
  );
};

export default App;
