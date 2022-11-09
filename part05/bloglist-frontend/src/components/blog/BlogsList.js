import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Togglable from '../Togglable';
import Blog from './Blog';
import BlogForm from './BlogsForm';
import { fetchBlogs, selectAllBlogs } from './blogsSlice';

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const sortByLikes = (blog1, blog2) => blog2.likes - blog1.likes;

  const blogs = useSelector(selectAllBlogs);
  const reqStatus = useSelector((state) => state.blogs.status);

  const orderedBlogs = blogs.slice().sort(sortByLikes);

  useEffect(() => {
    if (reqStatus === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [reqStatus, dispatch]);

  const handleBlogCreation = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm blogCreationHandler={handleBlogCreation}></BlogForm>
      </Togglable>

      {orderedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogsList;
