import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Initial Message',
});

export default notificationSlice.reducer;
