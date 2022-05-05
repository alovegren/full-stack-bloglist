import React, { useState } from 'react';

const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailsVisible, setDetailsVisible] = useState(false);
  const detailVisibility = { display: detailsVisible ? '' : 'none' };
  const buttonVisibility = { display: detailsVisible ? 'none' : '' };

  const toggleVisibility = () => setDetailsVisible(!detailsVisible);

  const handleDelete = () => {
    if (currentUser.username !== blog.user.username) {
      alert(`Sorry, you don't have permission to delete ${blog.title}.`);
    } else if (window.confirm(`Delete ${blog.title}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <article style={blogStyle}>
      <b>{blog.title}</b> by {blog.author}
      <button className="blogDetailButton" style={buttonVisibility}
        type="button"
        onClick={toggleVisibility}
      >
        view details
      </button>
      <section className="blogDetails" style={detailVisibility}>
        <button className="hideBlogDetailButton" type="button" onClick={toggleVisibility}>
          hide details
        </button>
        <p>
          url: {blog.url}<br />

          likes: <span className="qtyLikes">{blog.likes}</span>
          <button
            className="likeButton"
            type="button"
            onClick={() => likeBlog(blog)}
          >
            like
          </button><br />
          {blog.user.name}<br />

          <button
            className="deleteBlogButton"
            type="button"
            onClick={handleDelete}
          >
            remove
          </button>
        </p>
      </section>
    </article>
  );
};

export default Blog;