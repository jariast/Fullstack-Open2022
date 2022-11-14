import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Togglable from '../Togglable';
import Blog from './Blog';
import BlogForm from './BlogsForm';
import { fetchBlogs, selectBlogsIds } from './blogsSlice';

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const blogsIds = useSelector(selectBlogsIds);
  const reqStatus = useSelector((state) => state.blogs.status);

  useEffect(() => {
    if (reqStatus === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [reqStatus, dispatch]);

  const handleBlogCreation = () => {
    blogFormRef.current.toggleVisibility();
  };

  let content;

  if (reqStatus === 'succeeded' || blogsIds.length > 0) {
    content = blogsIds.map((blogId) => <Blog key={blogId} blogId={blogId} />);
  }

  return (
    <>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm blogCreationHandler={handleBlogCreation}></BlogForm>
      </Togglable>

      {content}
    </>
  );
};

export default BlogsList;
