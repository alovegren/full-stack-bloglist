import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const dummyBlog = {
  title: 'I am testing a component!',
  author: 'Nubster Lovegren',
  url: 'reysrey',
  likes: 0,
  user: {
    username: 'root',
    name: 'nubster',
    id: '1'
  },
  id: '2'
};

describe('when initially there exists one blog entry', () => {
  beforeEach(() => {
    render(<Blog blog={dummyBlog} />);
  });

  test(
    'the component does not render extra details (url and likes) by default',
    () => {
      const blogSection = document.querySelector('.blogDetails');
      expect(blogSection.style.display).toBe('none');
    });
  
  test('the extra details are rendered when the show button is clicked', async () => {
    const moreDetailsButton = document.querySelector('.blogDetailButton');
    await userEvent.click(moreDetailsButton);

    const blogSection = document.querySelector('.blogDetails');
    expect(blogSection.style.display).toBe('');
  });
});

describe('when initially there exist no blog entries', () => {
  test(
    'the event handler for the like button is invoked as many times as the like button is clicked',
    async () => {
      const likeBlog = jest.fn();
      render(<Blog blog={dummyBlog} likeBlog={likeBlog} />);

      const likeButton = document.querySelector('.likeButton');

      await userEvent.click(likeButton);
      await userEvent.click(likeButton);

      expect(likeBlog.mock.calls).toHaveLength(2);
    });
});