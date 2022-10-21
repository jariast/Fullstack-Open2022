import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('Blog renders Title and Author by default', () => {
  const blog = {
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

  render(<Blog blog={blog} user={blog.user}></Blog>);

  const wrapperElement = screen.getByTestId('blogWrapper');

  expect(wrapperElement.textContent).toContain(blog.title);
  expect(wrapperElement.textContent).toContain(blog.author);

  const urlElement = screen.queryByText(blog.url);
  expect(urlElement).toBeNull();

  const likesElement = screen.queryByText(blog.likes);
  expect(likesElement).toBeNull();
});

test('Blog renders url and likes when clicking Show Details button', async () => {
  const blog = {
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

  render(<Blog blog={blog} user={blog.user}></Blog>);

  const user = userEvent.setup();
  const button = screen.getByText('Show Details');
  await user.click(button);

  screen.debug();

  const wrapperElement = screen.getByTestId('blogWrapper');

  expect(wrapperElement.textContent).toContain(blog.title);
  expect(wrapperElement.textContent).toContain(blog.author);

  const urlElement = screen.queryByText(blog.url);
  expect(urlElement).toBeDefined();

  const likesElement = screen.queryByText(blog.likes);
  expect(likesElement).toBeDefined();
});
