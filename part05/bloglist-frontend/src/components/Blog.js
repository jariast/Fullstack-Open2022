import styled from 'styled-components';
import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetailsViz = () => {
    setShowDetails(!showDetails);
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
          <p>{blog.likes}</p>
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
