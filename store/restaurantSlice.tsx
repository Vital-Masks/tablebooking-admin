import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tab: 'general-details',
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: initialState,
  reducers: {
    setTab(state, { payload }) {
      state.tab = payload;
    },
  },
});

export const { setTab } = restaurantSlice.actions;

export default restaurantSlice.reducer;
