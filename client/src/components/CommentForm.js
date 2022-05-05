import React from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../reducers/bloglistReducer';

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch();

  const handleNewComment = async (event) => {
    event.preventDefault();

    const comment = event.target.comment.value;
    dispatch(addComment(blogId, comment));

    console.log(event.target.comment);
    event.target.comment.value = '';
  };

  return (
    <div>
      <form onSubmit={handleNewComment}>
        <input type="text" name="comment" />
        <button type="submit">new comment</button>
      </form>
    </div>
  );
};

export default CommentForm;