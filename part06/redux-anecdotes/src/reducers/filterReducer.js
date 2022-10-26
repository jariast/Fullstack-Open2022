import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => (state = action.payload),
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
