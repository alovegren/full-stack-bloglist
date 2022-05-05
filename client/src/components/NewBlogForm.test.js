import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

test(
  'when the new blog form is submitted, the correct event handler is called and passed the correct blog details',
  async () => {
    const addBlog = jest.fn();
    render(<NewBlogForm addBlog={addBlog} />);

    const addBlogButton = document.querySelector('.submitNewBlogBtn');
    await userEvent.click(addBlogButton);

    expect(Object.keys(addBlog.mock.calls[0][0])).toEqual(['title', 'author', 'url']);
  });