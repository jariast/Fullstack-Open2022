import styled from 'styled-components';
import { useState } from 'react';
import { likeBlog } from './blogsSlice';
import { useDispatch } from 'react-redux';

const Blog = ({ blog, user, deleteBlogHandler }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const showDeleteButton = user.id === blog.user.id;

  const toggleDetailsViz = () => {
    setShowDetails(!showDetails);
  };

  const handleLikeBlog = (blogTolike) => {
    const copy = { ...blogTolike };
    dispatch(likeBlog(copy));
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
    <Wrapper data-testid="blogWrapper">
      {blog.title} {blog.author}
      <button onClick={toggleDetailsViz} id="toggle-details-button">
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <DetailsWrapper>
          <p>{blog.url}</p>
          <p id="blog-likes">{blog.likes}</p>
          <button id="like-blog-button" onClick={() => handleLikeBlog(blog)}>
            Like Blog
          </button>
          <p>{blog.user.name}</p>
          {showDeleteButton && (
            <button id="delete-blog-button" onClick={() => deleteBlog(blog)}>
              Delete Blog
            </button>
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
