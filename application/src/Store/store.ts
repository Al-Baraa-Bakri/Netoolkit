import { configureStore, createSlice } from '@reduxjs/toolkit'; 
import { sidebarSlice } from './slices/sidebarSlice';
import { navigationSlice } from './slices/navigationSlice';
import { themeSlice } from './slices/themeSlice';

export const {openSidebar , closeSidebar} = sidebarSlice.actions;
export const { navigate } = navigationSlice.actions;
export const { makeThemeLight , makeThemeDark } = themeSlice.actions;




export const store = configureStore({
    reducer: {
        sidebar: sidebarSlice.reducer,
        navigation: navigationSlice.reducer, 
        theme: themeSlice.reducer
    }
}); 

