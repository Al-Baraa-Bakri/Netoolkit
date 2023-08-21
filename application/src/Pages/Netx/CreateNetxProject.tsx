import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NetxCreateHeader from '../../Components/Netx/NetxCreateHeader';
import CreateBuildingModal from '../../Components/Netx/CreateBuildingModal';
import { clearState, duplicateBuilding, initToUpdate, setName } from '../../Store/slices/Netx/selectedProjectSlice';
import { deleteBuilding } from '../../Store/slices/Netx/selectedProjectSlice';
import { clearBuildingState, initStateToUpdate } from '../../Store/slices/Netx/createBuildingSlice';
import UpdateBuildingModal from '../../Components/Netx/updateBuildingModal';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../Logic/axios';
import { count } from 'console';
const CreateNetxProject = ({update} : any) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { projectName , buildings } = useSelector((state) => state.ntxSelectedProject);
  const theme = useSelector((state: any) => state.theme.theme);
  const [isModalOpen , setIsModalOpen] = useState(false); 
  const [isUpdateModalOpen , setIsUpdateModalOpen] = useState(false);



  useEffect(() => {
    if(update) {

      const fetchBuildingDetails = async () => {
        const res = await axiosInstance({
            url: `netx/${id}`, 
            method: "GET", 
        });
        const project = res.data.project;
        
      const buildingPromises = project.buildings.map(async (buildingId) => {
        const buildingResponse = await axiosInstance({
          url: `netx/building/${buildingId}`
        });
        const buildingData =  buildingResponse.data.building;

        // Fetch floor details
        const floorPromises = buildingData.floors.map(async (floorId) => {
          const floorResponse = await axiosInstance({
          url: `netx/floor/${floorId}`
        });;
          const floorData = await floorResponse.data.floor;

          // Fetch room details for each floor
          const roomPromises = floorData.rooms.map(async (roomId) => {
            const roomResponse = await axiosInstance({
          url: `netx/room/${roomId}`
        });;
            const roomData = await roomResponse.data.room;
            return roomData; // The actual room details
          });

          const roomDataList = await Promise.all(roomPromises);
          floorData.rooms = roomDataList;
          return floorData; // The actual floor details with rooms
        });

        const floorDataList = await Promise.all(floorPromises);
        buildingData.floors = floorDataList;
            let numberOfFloors = 0 ; 
            let countNetworkPoints = 0;
            let numberOfRooms = 0;
            buildingData.floors.forEach((floor) => {
                numberOfFloors++
                floor.rooms.forEach((room) => {
                  console.log(room);
                  
                    numberOfRooms+=Number(room.count);
                })
            }) ;
            buildingData.floors.forEach((floor) => {
                floor.rooms.forEach((room) => {
                    countNetworkPoints+=Number(room.networkPoints) * room.count;
                })
            }) ;

            buildingData["numberOfFloors"] = numberOfFloors; 
            buildingData["numberOfNetworkPoints"] = countNetworkPoints; 
            
            buildingData["numberOfRooms"] = numberOfRooms
            return buildingData; // The actual building details with floors and rooms
      });

      const buildingDataList = await Promise.all(buildingPromises);
      dispatch(initToUpdate({
        projectName: project.projectName,
        buildings: buildingDataList
      }))
      console.log(buildingDataList);
    };

    fetchBuildingDetails();
    } 
    else{
      dispatch(clearState({}));
    }
  } , [update])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    dispatch(clearBuildingState({}))
  }
  const toggleUpdateModal = () => {
    setIsUpdateModalOpen(!isUpdateModalOpen);
  }
  const handleProjectName = (name: string) => {
    dispatch(setName({name}))
  }

  const handleDeleteBuilding = (buildingIndex: number) => {
    dispatch(deleteBuilding({buildingIndex}))
  }
  const handleUpdateBuilding = (buildingIndex: number) => {
    const buildingData = buildings.filter((building , i ) => i === buildingIndex)[0];
    dispatch(initStateToUpdate({buildingIndex , buildingData}))
    toggleUpdateModal();
  }

  const handleToastFromModels = (toast: any) => {
    if(toast.type === 'success') {
      toast.success(toast.msg);
    }
    if(toast.type === 'error') {
      toast.error(toast.msg);
    }
  }

  const handleDuplicateBuilding = (buildingId: any) => {
    dispatch(duplicateBuilding({
      buildingId
    }));
  }

  return (
    <main className={` p-6 ${theme==='light' ? 'bg-app-background-light' : 'bg-app-background-dark'}  h-screen flex flex-col gap-12`}>
        <NetxCreateHeader toggleModal={toggleModal} projectName={projectName} handleProjectName={handleProjectName}/>
        {
          buildings.length === 0 ? (<h1 className='w-full h-full flex items-center justify-center'>
            Start by adding some buildings
          </h1>) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-t border-[#ececec]">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className={`px-6 py-3 text-base ${theme === 'light' ? 'text-table-title-light' : 'text-table-title-dark'}`}>
                   Name
                </th>
                <th scope="col" className={`px-6 py-3 text-base ${theme === 'light' ? 'text-table-title-light' : 'text-table-title-dark'}`}>
                  Floors
                </th>
                <th scope="col" className={`px-6 py-3 text-base ${theme === 'light' ? 'text-table-title-light' : 'text-table-title-dark'}`}>
                  Rooms
                </th>
                <th scope="col" className={`px-6 py-3 text-base ${theme === 'light' ? 'text-table-title-light' : 'text-table-title-dark'}`}>
                  Network Points
                </th>
                <th scope="col" className={`px-6 py-3 text-base ${theme === 'light' ? 'text-table-title-light' : 'text-table-title-dark'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
                { buildings.map((building , i) => {
                  return (
                    <tr className={`${theme==='light' && (i % 2 === 0 || i === 0) ? 'bg-white' : theme==='light' && i % 2 === 0 ? 'bg-[#DDD]' : theme === 'dark' ? 'bg-gray-dark' : 'bg-[#DDD]'} border-b border-[#dbd3d3] cursor-pointer ${ i % 2 === 0 ? '' : '' } `}>
                      <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3`}>{building.buildingName}</td>
                      <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3`}>
                        {building?.numberOfFloors}
                      </td>
                      <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3`}>
                        {building?.numberOfRooms}
                      </td>
                      <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3`}>
                        {building?.numberOfNetworkPoints}
                      </td>
                      <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3 flex items-center gap-4`}>
                          <button onClick={() => handleUpdateBuilding(i)} className='flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center bg-primary text-white text-base font-medium'>
                            Update
                          </button>
                          <button onClick={() => handleDuplicateBuilding(i)} className='bg-gray flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center  text-white text-base font-medium'>
                            Duplicate
                          </button>
                          <button onClick={() => handleDeleteBuilding(i)} className='bg-error flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center  text-white text-base font-medium'>
                              Delete
                          </button>
                      </td>
                    </tr>
                  )
                }) }
            </tbody>
          </table>
          )
        }

        <CreateBuildingModal isOpen={isModalOpen} toggleModal={toggleModal} onToast={(toast: any) => handleToastFromModels()}/>
        <UpdateBuildingModal isOpen={isUpdateModalOpen} toggleModal={toggleUpdateModal}/>
    </main>
  )
}

export default CreateNetxProject