import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addBlog } from '../reducers/bloglistReducer';
import { flashNotification } from '../reducers/notificationReducer';

import NewBlogForm from '../components/NewBlogForm';
import Togglable from '../components/Togglable';

const blogStyle = {
  padding: 5,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Home = () => {
  const blogs = useSelector(state => state.bloglist);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const handleNewBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const inputs = event.target;

    const newBlogData = {
      title: inputs.title.value,
      author: inputs.author.value,
      url: inputs.url.value,
    };

    dispatch(addBlog(newBlogData));
    dispatch(flashNotification(
      `The blog ${newBlogData.title} was added.`,
      'positive'
    ));
  };

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonText='show new blog form' ref={blogFormRef}>
        <NewBlogForm handleNewBlog={handleNewBlog} />
      </Togglable>

      {[...blogs]
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map(blog => (
          <article key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </article>
        ))}
    </div>
  );
};

export default Home;