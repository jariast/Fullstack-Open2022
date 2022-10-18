import styled from 'styled-components';
import { useState } from 'react';

const Blog = ({ blog, updateBlogHandler, user, deleteBlogHandler }) => {
  const [showDetails, setShowDetails] = useState(false);

  const showDeleteButton = user.id === blog.user.id;

  const toggleDetailsViz = () => {
    setShowDetails(!showDetails);
  };

  const likeBlog = (blogTolike) => {
    const copy = { ...blogTolike };
    copy.likes++;
    updateBlogHandler(copy);
  };

  const deleteBlog = (blog) => {
    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      deleteBlogHandler(blog.id);
    }
  };

  return (
    <Wrapper>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleDetailsViz}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <DetailsWrapper>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>{' '}
          <button onClick={() => likeBlog(blog)}>Like</button>
          <p>{blog.user.name}</p>
          {showDeleteButton && (
            <button onClick={() => deleteBlog(blog)}>Delete Blog</button>
          )}
        </DetailsWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid gray;
  margin-bottom: 10px;
`;

const DetailsWrapper = styled.div``;

export default Blog;
