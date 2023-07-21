import { createSlice } from "@reduxjs/toolkit";


const theme = localStorage.getItem('theme');


export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: theme || 'light', 

  },
  reducers: {
    makeThemeLight: (state) => {
      state.theme = 'light';
      localStorage.setItem('theme' , 'light')
    },
    makeThemeDark: (state) => {
      state.theme = 'dark';
      localStorage.setItem('theme' , 'dark')
    },
  }
});