import { useState } from 'react';

const CommentForm = ({ commentBlogHandler }) => {
  const [comment, setComment] = useState('');

  const commentBlog = (event) => {
    event.preventDefault();
    commentBlogHandler(comment);
    setComment('');
  };

  return (
    <form onSubmit={commentBlog}>
      <div>
        <input
          type="text"
          id="comment"
          placeholder="Comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">Add Comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
