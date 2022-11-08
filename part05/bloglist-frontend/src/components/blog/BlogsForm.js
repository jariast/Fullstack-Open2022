import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../notification/notificationSlice';
import { createBlog } from './blogsSlice';

const BlogForm = ({ blogCreationHandler }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    handleBlogCreation();
    blogCreationHandler();
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleBlogCreation = async () => {
    try {
      const response = await dispatch(
        createBlog({ title, author, url })
      ).unwrap();
      dispatch(
        showNotification(
          `A new blog "${response.title}" by ${response.author} added`
        )
      );
    } catch (error) {
      dispatch(showNotification(error, true));
    }
  };

  return (
    <form onSubmit={addBlog}>
      <h1>Add new blog</h1>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          placeholder="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          placeholder="URL"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-blog-button" type="submit">
        Create
      </button>
    </form>
  );
};

export default BlogForm;
