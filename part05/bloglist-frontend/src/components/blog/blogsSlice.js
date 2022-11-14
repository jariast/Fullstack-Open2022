import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import blogsService from '../../services/blogs';

const blogsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.likes - a.likes,
});

const initialState = blogsAdapter.getInitialState({ status: 'idle' });

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

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      await blogsService.deleteBlog(blogId);
      return blogId;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
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
        blogsAdapter.upsertMany(state, action.payload);
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        blogsAdapter.addOne(state, action.payload);
      })
      .addCase(createBlog.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const updatedBlog = action.payload;

        const existingBlog = state.entities[updatedBlog.id];
        if (existingBlog) {
          existingBlog.likes = updatedBlog.likes;
        }
      })
      .addCase(deleteBlog.fulfilled, blogsAdapter.removeOne);
  },
});

export default blogsSlice.reducer;

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogsIds,
} = blogsAdapter.getSelectors((state) => state.blogs);

export const selectBlogsByUser = createSelector(
  [selectAllBlogs, (state, userId) => userId],
  (blogs, userId) => blogs.filter((blog) => blog.user === userId)
);
