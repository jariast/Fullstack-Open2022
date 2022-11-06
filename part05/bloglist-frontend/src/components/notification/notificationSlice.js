import { createSlice } from '@reduxjs/toolkit';

let timeoutId;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', isError: false },
  reducers: {
    setNotificationMessage: (state, action) => action.payload,
    clearNotificationMessage: (state) => {
      state.message = '';
      return state;
    },
  },
});

export const { setNotificationMessage, clearNotificationMessage } =
  notificationSlice.actions;

export const showNotification = (
  message,
  isError = false,
  durationInSeconds = 4
) => {
  return (dispatch) => {
    dispatch(setNotificationMessage({ message, isError }));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotificationMessage());
    }, durationInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
