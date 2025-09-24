import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SliceState } from '..';

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: {
    data: [],
    state: 'idle',
    error: null,
  } as SliceState<Notification[]>,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.data.push(...action.payload);
    },
  },
});

const { setNotifications } = notificationSlice.actions;

export { setNotifications };
export default notificationSlice.reducer;
