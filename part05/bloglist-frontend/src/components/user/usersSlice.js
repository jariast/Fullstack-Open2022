import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import loginService from '../../services/login';
import usersService from '../../services/users';

const initialState = { users: [], loggedUser: null };

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await loginService.login(username, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await usersService.getAll();
  return response;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLoggedIn: {
      reducer(state, action) {
        state.loggedUser = action.payload;
      },
    },
    userLoggedOut: {
      reducer(state) {
        state.loggedUser = null;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedUser = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;

export const selectLoggedUser = (state) => state.users.loggedUser;
