import Card from 'react-bootstrap/Card';

import { selectBlogById } from './blogsSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blog = ({ blogId }) => {
  const blog = useSelector((state) => selectBlogById(state, blogId));

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Card.Body>
        <Card.Title>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </Card.Title>
        <Card.Text>Author: {blog.author}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Likes: {blog.likes}</small>
      </Card.Footer>
    </Card>
  );
};

export default Blog;
