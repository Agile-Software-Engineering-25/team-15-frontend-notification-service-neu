import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SliceState } from '..';
import type { NotificationObject } from '@custom-types/notification-service';

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: {
    data: [],
    state: 'idle',
    error: null,
  } as SliceState<NotificationObject[]>,
  reducers: {
    replaceNotifications: (
      state,
      action: PayloadAction<NotificationObject[]>
    ) => {
      state.data = action.payload;
    },
    appendNotifications: (
      state,
      action: PayloadAction<NotificationObject[]>
    ) => {
      state.data.push(...action.payload);
    },
    clearNotifications: (state) => {
      state.data = [];
    },
  },
});

const { replaceNotifications, appendNotifications, clearNotifications } =
  notificationSlice.actions;

export { replaceNotifications, appendNotifications, clearNotifications };
export default notificationSlice.reducer;
