import themeConfig from '@/theme.config';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebar: false,
  navbar: themeConfig.navbar,
  menu: themeConfig.menu,
  layout: themeConfig.layout,
  rtlClass: themeConfig.rtlClass,
  animation: themeConfig.animation,
};

const themeConfigSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },

    setPageTitle(state, { payload }) {
      document.title = `${payload} | TICKETRAA`;
    },
  },
});

export const { toggleSidebar, setPageTitle } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
