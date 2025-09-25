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
    setNotifications: (state, action: PayloadAction<NotificationObject[]>) => {
      state.data.push(...action.payload);
    },
  },
});

const { setNotifications } = notificationSlice.actions;

export { setNotifications };
export default notificationSlice.reducer;
