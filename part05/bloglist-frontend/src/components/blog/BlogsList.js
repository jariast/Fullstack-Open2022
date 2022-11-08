import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Togglable from '../Togglable';
import Blog from './Blog';
import BlogForm from './BlogsForm';
import { fetchBlogs, selectAllBlogs } from './blogsSlice';

const BlogsList = ({ user }) => {
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

  // const handleBlogLike = async (blogToLike) => {
  //   try {
  //     const updatedBlog = await blogService.updateLikes(
  //       blogToLike.id,
  //       blogToLike
  //     );
  //     setBlogs(
  //       blogs
  //         .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
  //         .sort(sortByLikes)
  //     );
  //   } catch (error) {
  //     console.log('Blog liking error', error);
  //   }
  //};

  // const handleBlogDeletion = async (blogId) => {
  //   try {
  //     await blogService.deleteBlog(blogId);
  //     setBlogs(blogs.filter((blog) => blog.id !== blogId));
  //     dispatch(showNotification('Deleted blog', true));
  //   } catch (error) {
  //     console.log('Error Deleting blog', error);
  //     dispatch(showNotification(error.response.data.error, true));
  //   }
  // };

  return (
    <>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm blogCreationHandler={handleBlogCreation}></BlogForm>
      </Togglable>

      {orderedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // updateBlogHandler={handleBlogLike}
          user={user}
          // deleteBlogHandler={handleBlogDeletion}
        />
      ))}
    </>
  );
};

export default BlogsList;
