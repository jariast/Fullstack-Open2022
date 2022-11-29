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

const createBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, config);

  return response.data;
};

const updateBlog = async (blogToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${blogToUpdate.id}`,
    blogToUpdate
  );
  return response.data;
};

const deleteBlog = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

const blogsService = {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  setHeaderConfig,
};

export default blogsService;
