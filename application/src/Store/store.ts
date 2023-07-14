import { configureStore, createSlice } from '@reduxjs/toolkit'; 

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isSidebarOpen: false
  },
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    }
  }
});

export const {openSidebar , closeSidebar} = sidebarSlice.actions;

export const store = configureStore({
    reducer: {
        sidebar: sidebarSlice.reducer
    }
}); 

