import styled from 'styled-components';
import { useState } from 'react';

const Blog = ({ blog, updateBlogHandler }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetailsViz = () => {
    setShowDetails(!showDetails);
  };

  const likeBlog = (blogTolike) => {
    const copy = { ...blogTolike };
    copy.likes++;
    updateBlogHandler(copy);
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
