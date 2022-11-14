import styled from 'styled-components';
import { useState } from 'react';
import { deleteBlog, likeBlog, selectBlogById } from './blogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../notification/notificationSlice';
import { selectLoggedUser } from '../user/usersSlice';

const Blog = ({ blogId }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const blog = useSelector((state) => selectBlogById(state, blogId));

  const user = useSelector(selectLoggedUser);

  const showDeleteButton = user.id === blog.user;

  const toggleDetailsViz = () => {
    setShowDetails(!showDetails);
  };

  const handleLikeBlog = (blogTolike) => {
    const copy = { ...blogTolike };
    dispatch(likeBlog(copy));
  };

  const handleBlogDeletion = async (blog) => {
    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await dispatch(deleteBlog(blog.id)).unwrap();
        dispatch(showNotification(' Deleted Blog'));
      } catch (error) {
        dispatch(showNotification(error, true));
      }
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
            <button
              id="delete-blog-button"
              onClick={() => handleBlogDeletion(blog)}
            >
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
