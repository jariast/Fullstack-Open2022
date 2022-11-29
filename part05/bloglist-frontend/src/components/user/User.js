import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBlogsByUser } from '../blog/blogsSlice';
import { selectUserById } from './usersSlice';

const User = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, userId));

  const blogs = useSelector((state) => selectBlogsByUser(state, userId));

  if (!user) {
    return (
      <>
        <h1>User Not Found</h1>
      </>
    );
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>Added blogs:</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
