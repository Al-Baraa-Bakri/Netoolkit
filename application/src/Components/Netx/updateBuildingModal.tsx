import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Counter from "../Atoms/Buttons/Counter";
import Floor from "./Floor";
import { setName , setType , toggleRouter , addFloor,clearBuildingState ,  distributedFloor,  deleteFloor , setRoomName , duplicateFloor , duplicateRoom , deleteRoom ,  minusDuplicateRoom , addRoom , setRoomNetworkPoints, updateFloorName, addServer } from "../../Store/slices/Netx/createBuildingSlice";
import { addBuilding, updateBuilding } from "../../Store/slices/Netx/selectedProjectSlice";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const SERVERS = [
  "DHCP Server", 
  "DNS Server", 
  "PDC Server", 
  "Proxy Server", 
  "FireWall"
]

function UpdateBuildingModal({isOpen , toggleModal , onToast}: any) {
      const theme = useSelector((state: any) => state.theme.theme);
      const { id, floors , isCore , buildingName , isRouter , servers } = useSelector((state) => state.netxBuilding);
      const { projectName , buildings } = useSelector((state) => state.ntxSelectedProject);
      const { user , isLoading } = useAuth0();
      const dispatch = useDispatch();
      const handleBuildingName = (event: any) => {
            dispatch(setName(event.target.value));
      }
      const handleAddServer = (server) => {
        dispatch(addServer({
          server
        }))
      }
      const handleBuildingType = (type) => {
        console.log(buildings);
        
          if(type && buildings.filter((building) => building.isCore).length !== 0) {
          toast.error("You have already a Core building");
          return
        }
          dispatch(setType(type))
      }

      const handleAddFloor = () => {
        dispatch(addFloor());
      }

      const handleDeleteFloor = (floorIndex) => {        
        dispatch(deleteFloor(floorIndex))
      }

      const updateRoomName = (floorIndex , roomIndex , name) => {
        dispatch(setRoomName({
          floorIndex, 
          roomIndex,
          name
        }))
      }

      const handleUpdateFloorName = (floorIndex , name) => {
        dispatch(updateFloorName({floorIndex , name}))
      }


      const handleAddSameRoom = (floorIndex , roomIndex) => {
        dispatch(duplicateRoom({floorIndex , roomIndex}))
      }

      const handleToggleRouter = () => {
        dispatch(toggleRouter());
      }

      const handleMinusSameRoom = (floorIndex , roomIndex) => {
        dispatch(minusDuplicateRoom({floorIndex , roomIndex}))
      }

      const handleAddRoom = (floorIndex) =>{
        const rooms = floors.filter((floor , i) => i === floorIndex)[0].rooms
        if(!rooms[rooms.length - 1].roomName) {
          toast.error("Please enter the last room name"); 
          return;
        }
        
        dispatch(addRoom({
          floorIndex
        }));
      }

      const updateRoomNetworkPoints = (floorIndex , roomIndex , networkPoints) => {
        dispatch(setRoomNetworkPoints({
          floorIndex, 
          roomIndex, 
          networkPoints
        }))
      }

      const handleDeleteRoom = (floorIndex , roomIndex) => {
        dispatch(deleteRoom({
          floorIndex, 
          roomIndex
        }))
      }
      
      const handleDuplicateFloor = (floorIndex) => {
        dispatch(duplicateFloor({floorIndex}));
      }

      const handleDistributedFloor = (floorIndex) => {
        dispatch(distributedFloor({floorIndex}));
      }

      const handleUpdateBuilding = () => {
        if(!buildingName) {
          toast.error("Building name can not be empty");
          return;
        }

        if(floors.length === 0) {
          console.log("DDD");
          
          toast.error("Building have to be with one floor at least");
          return;
        }
        toggleModal(); 
        const buildingData = {buildingName , isCore , floors , id , servers , isRouter}
        dispatch(updateBuilding({buildingData})); 
        dispatch(clearBuildingState({}));
      }
  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-scroll ">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block p-4 align-bottom bg-white  sm:max-w-[70vw] rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
                <header className="flex items-center gap-4">
                    <h1 className={`text-lg font-bold ${theme==='light' ? 'text-title-light' : 'text-title-dark'} `}>
                        Building Name: 
                    </h1>
                    <input type="text" value={buildingName} onChange={(e) => handleBuildingName(e)} placeholder='...' 
                    className={`outline-none w-56 h-8 pl-4 caret-warning ${theme === 'light' ? 'bg-navbar-input-background-light text-black' : 'bg-navbar-input-background-dark text-gray-light'}
                    rounded-lg placeholder:text-[#7C7C8D] placeholder:text-base border border-gray-light 
                    `} 
          />
                </header>

                <div className="flex-col mt-[28px] flex items-ce gap-4">
                    <div className="flex items-center gap-4">
                    <h1 className={`text-lg font-bold ${theme==='light' ? 'text-primary' : 'text-title-dark'} `}>
                        Building Layer: 
                    </h1>
                        <div className="flex items-center cursor-pointer gap-8">
                            <div onClick={() => handleBuildingType(false)} className="flex items-center gap-2">
                                <span className={`block w-6 h-6 cursor-pointer border border-gray-light rounded-full ${!isCore ? 'bg-primary' : 'bg-white'}`}></span>
                                <h1 className={`text-base font-medium text-title-light`}>
                                    Distributed 
                                </h1>
                            </div>

                            <div onClick={() => handleBuildingType(true)} className="flex items-center gap-2">
                                <span className={`block w-6 h-6 cursor-pointer border border-gray-light rounded-full ${isCore ? 'bg-primary' : 'bg-white'}`}></span>
                                <h1 className={`text-base font-medium text-title-light`}>
                                    Core 
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                    <h1 className={`text-lg font-bold ${theme==='light' ? 'text-primary' : 'text-title-dark'} `}>
                        Router: 
                    </h1>
                        <div className="flex items-center cursor-pointer gap-8">
                            <div onClick={() => handleToggleRouter()} className="flex items-center gap-2">
                                <span className={`block w-6 h-6 cursor-pointer border border-gray-light rounded-full ${isRouter ? 'bg-primary' : 'bg-white'}`}></span>
                            </div>           
                        </div>
                    </div>
                                        {
                      isRouter && isCore && (
                    <div className="flex items-center gap-4">
                    <h1 className={`text-lg font-bold ${theme==='light' ? 'text-primary' : 'text-title-dark'} `}>
                        Servers: 
                    </h1>
                    
                        <div className="flex items-center cursor-pointer gap-8">
                          {
                            SERVERS.map((server) => {
                              return (
                              <div onClick={() => handleAddServer(server)} className="flex items-center gap-2">
                                  <span className={`block w-6 h-6 cursor-pointer border border-gray-light rounded-md ${servers.includes(server) ? 'bg-primary' : 'bg-white'}`}></span>
                                  <h1 className={`text-base font-medium text-title-light`}>
                                    {server} 
                                  </h1>
                              </div>     
                              )
                            })
                          }
      
                        </div>
                    </div>
                      )
                    }
                </div>

                {/* Floors */}
                <div className="w-full mt-8 h-80 overflow-y-scroll ">
                  <button onClick={() => handleAddFloor()} className='flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center bg-primary text-white text-base font-medium'>
                    Add A Floor
                   </button>
                   <div className="flex flex-col gap-4 h-full justify-center items-center">
                  {
                    floors.length === 0 ? (<h1>Add Some Floors</h1>) : (
                                       floors.map((floor , i) => {
                      return (
                        <Floor 
                        floorIndex={i} name={floor.name} rooms={floor.rooms} isDistributed={floor.isDistributed}
                        handleDeleteFloor={handleDeleteFloor} updateRoomName={updateRoomName}
                        addSameRoom={(floorIndex , i) => handleAddSameRoom(floorIndex , i)}
                        minusSameRoom={(floorIndex , i) => handleMinusSameRoom(floorIndex , i)}
                        updateRoomNetworkPoints={(floorIndex , roomIndex , networkPoints) => updateRoomNetworkPoints(floorIndex , roomIndex , networkPoints)}
                        addRoom={(floorIndex) => handleAddRoom(floorIndex)}
                        deleteRoom={(floorIndex , roomIndex) => handleDeleteRoom(floorIndex , roomIndex)}
                        duplicateFloor={(floorIndex) => handleDuplicateFloor(floorIndex)}
                        distributedFloor={(floorIndex) => handleDistributedFloor(floorIndex)}
                        handleUpdateFloorName={handleUpdateFloorName}
                        />
                      )
                    })
                    )
                  }

                   </div>
                </div>
               <div className="flex mt-7 w-full items-center justify-end gap-2">
                      <button onClick={() => toggleModal()} className='bg-gray flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center  text-white text-base font-medium'>
                        Close
                      </button>
                      <button onClick={() => handleUpdateBuilding()}  className='flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center bg-primary text-white text-base font-medium'>
                          Update Building
                      </button>
               </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateBuildingModal;
