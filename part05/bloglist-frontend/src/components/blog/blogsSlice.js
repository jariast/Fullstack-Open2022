import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogsService from '../../services/blogs';

const initialState = { blogs: [], status: 'idle' };

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await blogsService.getAll();
  return response;
});

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (newBlog, { rejectWithValue }) => {
    try {
      const response = await blogsService.createBlog(newBlog);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const likeBlog = createAsyncThunk(
  'blogs/likeBlog',
  async (blogToUpdate) => {
    blogToUpdate.likes++;
    const response = await blogsService.updateLikes(blogToUpdate);
    return response;
  }
);

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        let existingBlog = state.blogs.find((blog) => {
          return blog.id === updatedBlog.id;
        });
        if (existingBlog) {
          existingBlog.likes = updatedBlog.likes;
        }
      });
  },
});

export default blogsSlice.reducer;

export const selectAllBlogs = (state) => state.blogs.blogs;
