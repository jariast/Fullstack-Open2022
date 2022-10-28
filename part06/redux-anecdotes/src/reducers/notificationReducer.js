import { createSlice } from '@reduxjs/toolkit';

let timeoutId;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMessage: (state, action) => action.payload,
    clearNotificationMessage: () => '',
  },
});

export const { setNotificationMessage, clearNotificationMessage } =
  notificationSlice.actions;

export const showNotification = (message, durationInSeconds = 4) => {
  return (dispatch) => {
    dispatch(setNotificationMessage(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotificationMessage());
    }, durationInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
