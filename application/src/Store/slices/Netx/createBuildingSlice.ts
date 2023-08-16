import { createSlice } from "@reduxjs/toolkit";


const defaultRoom = {
      roomName: "Default room name", 
      networkPoints: 1, 
      count: 1
}

const defaultFloor = {
  name: "Default Floor", 
  isDistributed: false,
  rooms: [
    defaultRoom
  ]
}



const initialBuildingState = {
  buildingName: "",
  isCore: false, 
  isRouter: false, 
  servers: [] as any,
  floors: [
    defaultFloor
  ],
  numberOfFloors: 0, 
  numberOfRooms: 0, 
  numberOfNetworkPoints: 0
};

const buildingSlice = createSlice({
  name: "building",
  initialState: initialBuildingState,
  reducers: {
    setName: (state, action) => {
      state.buildingName = action.payload;
    },
    setType: (state , action) => {   
      state.isCore = action.payload;
    }, 
    toggleRouter: (state , action) => {
      state.isRouter = !state.isRouter;
    }, 
    addFloor: (state, action) => {
      state.floors.push(defaultFloor);
      state.numberOfFloors += state.numberOfFloors 
    },
    addServer: (state , action) => {
      if(state.servers.includes(action.payload.server)) {
        state.servers = state.servers.filter((server) => server != action.payload.server);
      }
      else {
        state.servers.push(action.payload.server);
      }
    }, 
    updateFloorName: (state , action) => {
      state.floors = state.floors.map((floor , i) => {
        if(i === action.payload.floorIndex) {
          return {
            ...floor, 
            name: action.payload.name
          }
        }
        else {
          return floor
        }
      })
    },
    deleteFloor: (state, action) => {
      state.floors = state.floors.filter((floor , i) => action.payload !== i);
      state.numberOfFloors -= state.numberOfFloors 
    },
    duplicateFloor: (state, action) => {
      const { floorIndex } = action.payload; 
      const newFloor = state.floors.filter((floor , i) => floorIndex === i)[0]; 
      state.floors.push({...newFloor , isDistributed: false});
      state.numberOfFloors += state.numberOfFloors 
    },
    distributedFloor: (state, action) => {
      const { floorIndex } = action.payload; 
      if(!state.floors[floorIndex].isDistributed) {
         state.floors = state.floors.map((floor) => {
          return {
            ...floor, 
            isDistributed: false
          } 
        })
        state.floors[floorIndex] = {...state.floors[floorIndex] , isDistributed: true};
      } else {
        state.floors[floorIndex] = {...state.floors[floorIndex] , isDistributed: false};
      }
    }
    ,
    addRoom: (state, action) => {
      const { floorIndex } = action.payload;
      state.floors[floorIndex].rooms.push(defaultRoom);
      state.numberOfRooms += state.numberOfRooms 
    },
    deleteRoom: (state , action) => {
      const { floorIndex, roomIndex } = action.payload;
      state.floors[floorIndex].rooms = state.floors[floorIndex].rooms.filter((room , i) => i !== roomIndex);
      state.numberOfRooms -= state.numberOfRooms 
    },
    duplicateRoom: (state , action) => {
      const { floorIndex, roomIndex} = action.payload;
      state.floors[floorIndex].rooms[roomIndex].count = state.floors[floorIndex].rooms[roomIndex].count + 1;
      state.numberOfRooms += state.numberOfRooms 
    },
    minusDuplicateRoom: (state , action) => {
      const { floorIndex, roomIndex} = action.payload;
      if(state.floors[floorIndex].rooms[roomIndex].count === 0) {
        return;
      }
      state.floors[floorIndex].rooms[roomIndex].count = state.floors[floorIndex].rooms[roomIndex].count - 1;
    },
    setRoomName: (state, action) => {      
      const { floorIndex, roomIndex, name } = action.payload;
      state.floors[floorIndex].rooms[roomIndex].roomName = name;
    },
    setRoomNetworkPoints: (state, action) => {
      const { floorIndex, roomIndex, networkPoints } = action.payload;
      if(Number(networkPoints) < 0) {
        return;
      }
      state.numberOfNetworkPoints -= Number( state.floors[floorIndex].rooms[roomIndex].networkPoints)
      state.floors[floorIndex].rooms[roomIndex].networkPoints = networkPoints;
      state.numberOfNetworkPoints += Number(networkPoints)
    },

    clearBuildingState: (state, action) => {
      return initialBuildingState;
    },
    initStateToUpdate: (state , action) => {
      const { buildingData } = action.payload; 
      return buildingData
    }
  },
});

export const {
  setName,
  setType,
  toggleRouter,
  addFloor,
  addRoom,
  duplicateRoom, 
  minusDuplicateRoom,
  deleteFloor,
  deleteRoom,
  setRoomName,
  setRoomNetworkPoints,
  duplicateFloor, 
  distributedFloor, 
  clearBuildingState,
  initStateToUpdate, 
  updateFloorName, 
  addServer
} = buildingSlice.actions;
export default buildingSlice;