import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogsService from '../../services/blogs';

const initialState = { blogs: [], status: 'idle' };

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
      });
  },
});

export default blogsSlice.reducer;

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await blogsService.getAll();
  return response;
});

export const selectAllBlogs = (state) => state.blogs.blogs;
