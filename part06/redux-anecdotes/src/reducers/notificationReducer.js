import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => '',
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
