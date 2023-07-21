import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    currentApp: 'home'
  },
  reducers: {
    navigate: (state , actions) => {
      state.currentApp = actions.payload;
    },
  }
});