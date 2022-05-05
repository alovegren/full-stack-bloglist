import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    tone: null,
  },
  reducers: {
    setMessage(state, action) {
      return { ...state, message: action.payload };
    },

    setTone(state, action) {
      return { ...state, tone: action.payload };
    },
  }
});

export const { setMessage, setTone } = notificationSlice.actions;

export const flashNotification = (message, tone) => {
  return async dispatch => {
    dispatch(setMessage(message));
    dispatch(setTone(tone));

    setTimeout(() => {
      dispatch(setMessage(null));
      dispatch(setTone(null));
    }, 3000);
  };
};

export default notificationSlice.reducer;