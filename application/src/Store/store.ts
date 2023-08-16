import { configureStore, createSlice } from '@reduxjs/toolkit'; 
import { sidebarSlice } from './slices/sidebarSlice';
import { navigationSlice } from './slices/navigationSlice';
import { themeSlice } from './slices/themeSlice';
import netxProjectSlice from './slices/Netx/netxProjectSlice';
import buildingSlice from './slices/Netx/createBuildingSlice';
import selectedProjectSlice from './slices/Netx/selectedProjectSlice';
import netxProjectResultsSlice from './slices/Netx/projectResultsSlice';
export const {openSidebar , closeSidebar} = sidebarSlice.actions;
export const { navigate } = navigationSlice.actions;
export const { makeThemeLight , makeThemeDark } = themeSlice.actions;



export const store = configureStore({
    reducer: {
        sidebar: sidebarSlice.reducer,
        navigation: navigationSlice.reducer, 
        theme: themeSlice.reducer, 
        netxProjects: netxProjectSlice.reducer,
        netxBuilding: buildingSlice.reducer,
        ntxSelectedProject: selectedProjectSlice.reducer, 
        ntxProjectResults: netxProjectResultsSlice.reducer
    }
}); 

