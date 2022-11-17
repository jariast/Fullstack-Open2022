import styled from 'styled-components';
import { selectBlogById } from './blogsSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blog = ({ blogId }) => {
  const blog = useSelector((state) => selectBlogById(state, blogId));

  return (
    <Wrapper data-testid="blogWrapper">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          <span>
            {blog.title} {blog.author}
          </span>
        </Link>
        <p>{`Likes: ${blog.likes}`}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid gray;
  margin-bottom: 10px;
`;

export default Blog;
