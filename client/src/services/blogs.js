import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blogInfo) => {
  const newBlog = await axios.post(
    baseUrl,
    blogInfo,
    { headers: { Authorization: token } },
  );

  return newBlog.data;
};

const update = async (blog) => {
  blog = { ...blog, user: blog.user.id };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

const comment = async (id, comment) => {
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment }
  );

  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    { headers: { Authorization: token } }
  );
  return response;
};

const services = { getAll, setToken, create, update, remove, comment };

export default services;