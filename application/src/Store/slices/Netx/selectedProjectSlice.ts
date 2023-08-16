import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../Logic/axios";



const initialProjectState = {
  projectName: '', 
  buildings: [],
};

const selectedProjectSlice = createSlice({
    name: "selectedProject", 
    initialState: initialProjectState, 
    reducers: {
        setName: (state, action) => {
            const {name} = action.payload; 
            state.projectName = name;
        }, 
        clearState: (state , action) => {
            return initialProjectState;
        },
        addBuilding: (state , action) => {
            let countRooms = 0 ; 
            let countNetworkPoints = 0;
            action.payload.floors.forEach((floor) => {
                floor.rooms.forEach((room) => {
                    countRooms+=room.count;
                })
            }) ;
            action.payload.floors.forEach((floor) => {
                floor.rooms.forEach((room) => {
                    countNetworkPoints+=Number(room.networkPoints) * room.count;
                })
            }) ;
            const building = {
                buildingName: action.payload.buildingName, 
                floors: action.payload.floors,
                isCore: action.payload.isCore,
                numberOfFloors: action.payload.floors.length, 
                numberOfRooms: countRooms, 
                numberOfNetworkPoints: countNetworkPoints,
                id: state.buildings.length, 
                servers: action.payload.servers, 
                isRouter: action.payload.isRouter
            }; 
            state.buildings.push(building);
        }, 
        deleteBuilding: (state, action) => {
            const { buildingIndex } = action.payload;
            state.buildings = state.buildings.filter((building , i) => buildingIndex !== i)
        }, 
        updateBuilding: (state, action) => {
            let countRooms = 0 ; 
            let countNetworkPoints = 0;
            const {buildingData} = action.payload;
            buildingData.floors.forEach((floor) => {
                floor.rooms.forEach((room) => {
                    countRooms+=room.count;
                })
            }) ;
            buildingData.floors.forEach((floor) => {
                floor.rooms.forEach((room) => {
                    countNetworkPoints+=Number(room.networkPoints) * room.count;
                })
            }) ;
            state.buildings = state.buildings.map((building , i) => {
                if(buildingData.id === building.id) {
                return {...buildingData , numberOfFloors: buildingData.floors.length, 
                numberOfRooms: countRooms, 
                numberOfNetworkPoints: countNetworkPoints,}
                }
                else {
                    return building
                }
            })
            return state;
        } , 
        initToUpdate: (state, action) => {
            console.log(action.payload);
            
            return action.payload
        }, 
    }  
})

export const {setName , clearState , addBuilding , deleteBuilding , updateBuilding , initToUpdate} = selectedProjectSlice.actions; 

export default selectedProjectSlice; 