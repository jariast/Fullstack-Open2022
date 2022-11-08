import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import blogService from '../../services/blogs';
import Togglable from '../Togglable';
import Blog from './Blog';
import BlogForm from './BlogsForm';
import { showNotification } from '../notification/notificationSlice';

const BlogsList = ({ user }) => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();
  const sortByLikes = (blog1, blog2) => blog2.likes - blog1.likes;

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(sortByLikes)));
  }, []);

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
      dispatch(showNotification('Deleted blog', true));
    } catch (error) {
      console.log('Error Deleting blog', error);
      dispatch(showNotification(error.response.data.error, true));
    }
  };

  return (
    <>
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
};

export default BlogsList;
