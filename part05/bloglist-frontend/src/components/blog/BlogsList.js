import { useRef } from 'react';
import { useSelector } from 'react-redux';

import Togglable from '../Togglable';
import Blog from './Blog';
import BlogForm from './BlogsForm';
import { selectBlogsIds } from './blogsSlice';

const BlogsList = () => {
  const blogFormRef = useRef();

  const blogsIds = useSelector(selectBlogsIds);
  const reqStatus = useSelector((state) => state.blogs.status);

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
