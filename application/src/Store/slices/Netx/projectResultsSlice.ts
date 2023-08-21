import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Logic/axios';


export const getProjectResults = createAsyncThunk(
    'netxProjects/getProjectResults', 
    async (data: any) => {
        const { projectId } = data; 
        const res = await axiosInstance({
            url: `netx/calculate/${projectId}`, 
            method: "GET", 
            data: {
                projectId
            }
        })
        console.log(res.data);
        
        return res.data;
    }
)


const initialState: any = {
  projectResult: {},
  resultStatus: 'idle'
};


const netxProjectResultsSlice = createSlice({
    name: 'netxProjectResults', 
    initialState, 
    reducers: {
    clearResults: (state, action) => {
      return initialState;
    },
    }, 
    extraReducers: (builder) => {
        builder.addCase(getProjectResults.pending, (state) => {            
            state.resultStatus = 'loading'
        }),
        builder.addCase(getProjectResults.fulfilled, (state , action) => {
            state.resultStatus = 'success';
            state.projectResult = action.payload.results
        }),
        builder.addCase(getProjectResults.rejected, (state , action) => {
            state.resultStatus = 'error'
            state.error = action.error.message
        })
    }
})

export const getProjectResult = (state: any) => state.netxProjects.projectResult;
export const getProjectResultStatus = (state: any) => state.netxProjects.resultStatus;

export const {
    clearResults
} = netxProjectResultsSlice.actions;

export default netxProjectResultsSlice;