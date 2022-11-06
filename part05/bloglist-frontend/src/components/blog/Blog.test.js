import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blogMock = {
  title: 'Vacunas bad',
  author: 'Elking Patarroyo',
  url: 'google.com',
  likes: 8,
  user: {
    username: 'camono',
    name: 'Camilo',
    id: '6346e333ea0babe14960ee12',
  },
  id: '6346edf620b6826361e29a6b',
};

test('Blog renders Title and Author by default', () => {
  render(<Blog blog={blogMock} user={blogMock.user}></Blog>);

  const wrapperElement = screen.getByTestId('blogWrapper');

  expect(wrapperElement.textContent).toContain(blogMock.title);
  expect(wrapperElement.textContent).toContain(blogMock.author);

  const urlElement = screen.queryByText(blogMock.url);
  expect(urlElement).toBeNull();

  const likesElement = screen.queryByText(blogMock.likes);
  expect(likesElement).toBeNull();
});

test('Blog renders url and likes when clicking Show Details button', async () => {
  render(<Blog blog={blogMock} user={blogMock.user}></Blog>);

  const user = userEvent.setup();
  const button = screen.getByText('Show Details');
  await user.click(button);

  const wrapperElement = screen.getByTestId('blogWrapper');

  expect(wrapperElement.textContent).toContain(blogMock.title);
  expect(wrapperElement.textContent).toContain(blogMock.author);

  const urlElement = screen.queryByText(blogMock.url);
  expect(urlElement).toBeDefined();

  const likesElement = screen.queryByText(blogMock.likes);
  expect(likesElement).toBeDefined();
});

test('Blog calls updateHandler twice', async () => {
  const mockUpdateHandler = jest.fn();

  render(
    <Blog
      blog={blogMock}
      user={blogMock.user}
      updateBlogHandler={mockUpdateHandler}
    ></Blog>
  );

  const user = userEvent.setup();
  const button = screen.getByText('Show Details');
  await user.click(button);

  const likeButton = screen.getByText('Like Blog');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockUpdateHandler.mock.calls).toHaveLength(2);
});
