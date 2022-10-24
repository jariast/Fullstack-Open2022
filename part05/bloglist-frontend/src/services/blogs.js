import axios from 'axios';
const baseUrl = '/api/blogs';

let config = null;

const setHeaderConfig = (newToken) => {
  const token = `bearer ${newToken}`;
  config = { headers: { Authorization: token } };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (token, blog) => {
  const response = await axios.post(baseUrl, blog, config);

  return response.data;
};

const updateLikes = async (blogId, blogToUpdate) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, blogToUpdate);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

const blogsService = {
  getAll,
  createBlog,
  updateLikes,
  deleteBlog,
  setHeaderConfig,
};

export default blogsService;
