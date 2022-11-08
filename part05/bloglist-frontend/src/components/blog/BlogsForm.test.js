import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogsForm';

test('Blogs forms udpates parent state and calls OnSubmit', async () => {
  const addBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm addBloghandler={addBlog} />);

  const titleInput = screen.getByPlaceholderText('Title');
  const authorInput = screen.getByPlaceholderText('Author');
  const UrlInput = screen.getByPlaceholderText('URL');
  const submitButton = screen.getByText('Create');

  await user.type(titleInput, 'Test Title01');
  await user.type(authorInput, 'Author 001');
  await user.type(UrlInput, 'gggo.com');

  await user.click(submitButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'Test Title01',
    author: 'Author 001',
    url: 'gggo.com',
  });
});
