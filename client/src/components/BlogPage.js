import React from 'react';
import { useDispatch } from 'react-redux';

import { likeBlog } from '../reducers/bloglistReducer';
import CommentForm from './CommentForm';

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLike = (blogInfo) => {
    dispatch(likeBlog(blogInfo));
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        {blog.url}<br />
        {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button><br />
        added by {blog.author}
      </p>
      <h3>comments</h3>
      <CommentForm blogId={blog.id} />
      <ul>
        {blog.comments.map((comment, idx) => (
          <li key={idx}>{comment}</li> // bad missy! don't use indices as keys
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;