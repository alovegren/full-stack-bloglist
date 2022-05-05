import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const bloglistSlice = createSlice({
  name: 'bloglist',
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      return action.payload;
    },

    appendBlog(state, action) {
      return state.concat(action.payload);
    },

    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map(blog => (
        blog.id === updatedBlog.id ? updatedBlog : blog
      ));
    },

    removeBlog(state, action) {
      return state.filter(blog => (
        blog.id !== action.payload
      ));
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } = bloglistSlice.actions;

export const initializeBloglist = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (newBlog) => {
  return async dispatch => {
    const addedBlog = await blogService.create(newBlog);
    dispatch(appendBlog(addedBlog));
  };
};

export const likeBlog = (blog) => {
  return async dispatch => {
    blog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog);
    dispatch(updateBlog(blog));
  };
};

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(id, comment);
    dispatch(updateBlog(updatedBlog));
  };
};

export default bloglistSlice.reducer;