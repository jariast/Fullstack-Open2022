import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (token, blog) => {
  const config = { headers: { Authorization: `bearer ${token}` } };

  const response = await axios.post(baseUrl, blog, config);

  return response.data;
};

const blogsService = { getAll, createBlog };

export default blogsService;
