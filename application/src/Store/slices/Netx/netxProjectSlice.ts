import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Logic/axios';
import { toast } from 'react-toastify';

const NETX_PROJECTS_URL = import.meta.env.VITE_API; 

export const createProject = createAsyncThunk(
    'netxProjects/createProject', 
    async (data: any) => {
        const { email , projectName , buildings } = data; 
        const res = await axiosInstance({
            url: `netx?email=${email}`, 
            method: "POST", 
            data: {
                projectName, 
                buildings
            }
        })
        toast.success("Project created successfully")
        return res.data.createdProject;
    }
)

export const getProject = createAsyncThunk(
    'netxProjects/getProject', 
    async (data: any) => {
        const {projectId } = data; 
        const res = await axiosInstance({
            url: `netx/${projectId}`, 
            method: "GET", 
        })
        return res.data;
    }
)

export const fetchProjects = createAsyncThunk(
    'netxProjects/fetchProjects', 
    async (email) => {
        const res = await axiosInstance({
            url: `netx?email=${email}`
        })
        return res.data;
    }
)

export const deleteProject = createAsyncThunk(
    'netxProjects/deleteProject', 
    async (data: {
        email: string, 
        projectId: string
    }) => {
        const { email , projectId } = data; 

        const res = await axiosInstance({
            method: 'DELETE',
            url: `netx/${projectId}?email=${email}`
        })

        return res.data.deletedProject; 
    }
)

const initialState: any = {
  projects: [],
  status: 'idle',
  createProjectStatus: 'idle',
  deleteProjectStatus: 'idle',
  getProjectStatus: 'idle',
  project: {}, 
  error: null,
};


const netxProjectSlice = createSlice({
    name: 'netxProject', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(fetchProjects.pending, (state) => {
            state.status = 'loading'
        }),
        builder.addCase(fetchProjects.fulfilled, (state , action) => {
            state.status = 'succeeded';
            state.projects = action.payload.projects;
            
        }),
        builder.addCase(fetchProjects.rejected, (state , action) => {
            state.status = 'error'
            state.error = action.error.message
        })
        builder.addCase(deleteProject.pending, (state) => {
            state.deleteProjectStatus = 'loading'; 
        }),
        builder.addCase(deleteProject.rejected, (state) => {
            state.deleteProjectStatus = 'error'; 
        }),
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.deleteProjectStatus = 'success', 
            state.projects = state.projects.filter((p: any) => p._id !== action.payload._id)
        }), 
        builder.addCase(createProject.pending, (state) => {
            state.createProjectStatus = 'loading'
        }),
        builder.addCase(createProject.rejected, (state) => {
            state.createProjectStatus = 'error'
        }),
        builder.addCase(createProject.fulfilled, (state , action) => {
            console.log(action.payload);
            state.projects.push(action.payload);
            state.createProjectStatus = 'success';
        }), 
        builder.addCase(getProject.fulfilled , (state , action) => {
            state.getProjectStatus = 'success';
            state.project = action.payload.project; 
        }),
        builder.addCase(getProject.pending , (state , action) => {
            state.getProjectStatus = 'loading';
        })
    }
})

export const getAllProjects = (state: any) => state.netxProjects.projects;
export const getSpecificProject = (state: any) => state.netxProjects.project;
export const getProjectsStatus = (state: any) => state.netxProjects.status;
export const getProjectStatus = (state: any) => state.netxProjects.getProjectStatus;
export const getProjectsError = (state: any) => state.netxProjects.error;
export const getDeleteProjectStatus = (state: any) => state.netxProjects.deleteProjectStatus;
export const getCreateProjectStatus = (state: any) => state.netxProjects.createProjectStatus;

export default netxProjectSlice;