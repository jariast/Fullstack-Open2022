import React from 'react';

const BlogForm = ({
  submitHandler,
  newAuthor,
  authorHandler,
  newTitle,
  titleHandler,
  newUrl,
  urlHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <h1>Add new blog</h1>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={newTitle}
          onChange={titleHandler}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          value={newAuthor}
          onChange={authorHandler}
        />
        <label htmlFor="url">URL</label>
        <input type="text" id="url" value={newUrl} onChange={urlHandler} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
