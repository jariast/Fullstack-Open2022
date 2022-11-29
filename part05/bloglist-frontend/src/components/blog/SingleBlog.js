import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { showNotification } from '../notification/notificationSlice';
import { selectLoggedUser, selectUserById } from '../user/usersSlice';
import {
  commentBlog,
  deleteBlog,
  likeBlog,
  selectBlogById,
} from './blogsSlice';
import CommentForm from './CommentForm';

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { blogId } = useParams();

  const navigate = useNavigate();

  const blog = useSelector((state) => selectBlogById(state, blogId));

  const creatorId = blog ? blog.user : null;

  const creator = useSelector((state) => selectUserById(state, creatorId));
  const loggedUser = useSelector(selectLoggedUser);

  const showDeleteButton = loggedUser.id === creatorId;

  const handleLikeBlog = (blogTolike) => {
    const copy = { ...blogTolike };
    dispatch(likeBlog(copy));
  };

  const handleCommentBlog = (comment) => {
    const copy = { ...blog };
    dispatch(commentBlog({ blogToUpdate: copy, comment }));
  };

  const handleBlogDeletion = async (blog) => {
    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await dispatch(deleteBlog(blog.id)).unwrap();
        navigate('/blogs');
        dispatch(showNotification(' Deleted Blog'));
      } catch (error) {
        dispatch(showNotification(error, true));
      }
    }
  };

  if (!blog) {
    return (
      <>
        <h1>Blog Not Found</h1>
      </>
    );
  }

  return (
    <>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p>{`${blog.likes} likes`} </p>{' '}
      <button id="like-blog-button" onClick={() => handleLikeBlog(blog)}>
        Like Blog
      </button>
      {showDeleteButton && (
        <button
          id="delete-blog-button"
          onClick={() => handleBlogDeletion(blog)}
        >
          Delete Blog
        </button>
      )}
      <p>{creator && `Added by ${creator.name}`}</p>
      <h2>Comments</h2>
      <CommentForm commentBlogHandler={handleCommentBlog}></CommentForm>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      {/* This "hack" for the key seems to indicate that I used the
      wrong approach for implementing comments */}
    </>
  );
};

export default SingleBlog;
