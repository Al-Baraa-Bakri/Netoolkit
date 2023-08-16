import React from 'react'
import { useSelector } from 'react-redux';
import Counter from '../Atoms/Buttons/Counter';

const Floor = ({rooms , isDistributed , floorIndex , handleDeleteFloor , handleUpdateFloorName , name , updateRoomName , addSameRoom , minusSameRoom , addRoom , updateRoomNetworkPoints , deleteRoom , duplicateFloor, distributedFloor}: any) => {    
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <div className='w-full'>
    <div className='mb-1 w-full flex items-center justify-between'>
        <input className='text-center bg-transparent' value={name} type='text' onChange={(e) => handleUpdateFloorName(floorIndex, e.target.value)}/>
        <button onClick={() => handleDeleteFloor(floorIndex)} className='bg-error flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center  text-white text-base font-medium'>
            Delete
        </button>
    </div>
     <div className='w-full h-52 bg-primary rounded-3xl p-4 pt-8 overflow-y-scroll scrollbar scrollbar-w-0'>
                <div className="relative overflow-x-auto sm:rounded-lg bg-primary w-full rounded-2xl max-h-52 flex flex-col gap-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-t bg-white border-[#ececec] text-center">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='bg-white'>
                            <th scope="col" className={`px-6 py-3 text-base ${theme === 'light' ? 'text-table-title-light' : 'text-table-title-dark'}`}>
                             Name
                            </th>
                            <th scope="col" className={`px-6 py-3 text-base ${theme === 'light' ? 'text-table-title-light' : 'text-table-title-dark'}`}>
                            Counts
                            </th>
                            <th>
                                Network Points
                            </th>
                        </tr>
                        
                        </thead>
                        <tbody>
                            {
                                rooms?.map((room , i) => {
                                    return (
                                        <tr className={`${theme==='light' && (i % 2 === 0 || i === 0) ? 'bg-white' : theme==='light' && i % 2 === 0 ? 'bg-[#DDD]' : theme === 'dark' ? 'bg-gray-dark' : 'bg-[#DDD]'} border-b border-[#dbd3d3] cursor-pointer ${ i % 2 === 0 ? '' : '' } `}>
                                            <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3`}>
                                                <input className='text-center bg-transparent' value={room?.roomName} type='text' onChange={(e) => updateRoomName(floorIndex , i , e.target.value)}/>
                                            </td>
                                            <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3 flex items-center justify-center`}>
                                                <Counter number={room.count} addOne={() => addSameRoom(floorIndex , i)} minusOne={() => minusSameRoom(floorIndex , i)}/>
                                            </td>
                                            <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3`}>
                                                <input className='w-8 text-center bg-transparent' type='number' value={room?.networkPoints} onChange={(e) => updateRoomNetworkPoints(floorIndex , i , e.target.value )}/>
                                            </td>
                                            <td>
                                                <svg onClick={() => deleteRoom(floorIndex , i)} width="25" height="25" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 3.26904V3.39404H7V3.26904C7 3.00383 6.89464 2.74947 6.70711 2.56194C6.51957 2.3744 6.26522 2.26904 6 2.26904C5.73478 2.26904 5.48043 2.3744 5.29289 2.56194C5.10536 2.74947 5 3.00383 5 3.26904ZM4.375 3.39404V3.26904C4.375 2.83807 4.54621 2.42474 4.85095 2.11999C5.1557 1.81525 5.56902 1.64404 6 1.64404C6.43098 1.64404 6.8443 1.81525 7.14905 2.11999C7.45379 2.42474 7.625 2.83807 7.625 3.26904V3.39404H10.4375C10.5204 3.39404 10.5999 3.42697 10.6585 3.48557C10.7171 3.54418 10.75 3.62366 10.75 3.70654C10.75 3.78942 10.7171 3.86891 10.6585 3.92751C10.5999 3.98612 10.5204 4.01904 10.4375 4.01904H9.70825L9.20825 9.98304C9.17026 10.4359 8.9635 10.858 8.62896 11.1657C8.29441 11.4733 7.85649 11.6441 7.402 11.644H4.598C4.14355 11.644 3.70569 11.4732 3.3712 11.1656C3.03671 10.858 2.82999 10.4359 2.792 9.98304L2.292 4.01904H1.5625C1.47962 4.01904 1.40013 3.98612 1.34153 3.92751C1.28292 3.86891 1.25 3.78942 1.25 3.70654C1.25 3.62366 1.28292 3.54418 1.34153 3.48557C1.40013 3.42697 1.47962 3.39404 1.5625 3.39404H4.375ZM5.375 5.70654C5.375 5.6655 5.36692 5.62487 5.35121 5.58695C5.33551 5.54904 5.31249 5.51459 5.28347 5.48557C5.25445 5.45655 5.22 5.43353 5.18209 5.41783C5.14417 5.40213 5.10354 5.39404 5.0625 5.39404C5.02146 5.39404 4.98083 5.40213 4.94291 5.41783C4.905 5.43353 4.87055 5.45655 4.84153 5.48557C4.81251 5.51459 4.78949 5.54904 4.77379 5.58695C4.75808 5.62487 4.75 5.6655 4.75 5.70654V9.33154C4.75 9.37258 4.75808 9.41322 4.77379 9.45113C4.78949 9.48905 4.81251 9.52349 4.84153 9.55251C4.87055 9.58153 4.905 9.60455 4.94291 9.62025C4.98083 9.63596 5.02146 9.64404 5.0625 9.64404C5.10354 9.64404 5.14417 9.63596 5.18209 9.62025C5.22 9.60455 5.25445 9.58153 5.28347 9.55251C5.31249 9.52349 5.33551 9.48905 5.35121 9.45113C5.36692 9.41322 5.375 9.37258 5.375 9.33154V5.70654ZM6.9375 5.39404C6.765 5.39404 6.625 5.53404 6.625 5.70654V9.33154C6.625 9.41442 6.65792 9.49391 6.71653 9.55251C6.77513 9.61112 6.85462 9.64404 6.9375 9.64404C7.02038 9.64404 7.09987 9.61112 7.15847 9.55251C7.21708 9.49391 7.25 9.41442 7.25 9.33154V5.70654C7.25 5.53404 7.11 5.39404 6.9375 5.39404Z" fill="#F83248"/>
                                                </svg>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <div className='w-full flex items-center justify-center gap-4'>
                    <button onClick={() => addRoom(floorIndex)} className='flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center text-primary bg-white text-base font-medium'>
                       add a room
                    </button>
                    <button onClick={() => distributedFloor(floorIndex)}  className={`flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center ${isDistributed ? 'text-white bg-primary border border-white shadow-lg' : 'text-primary bg-white'} text-base font-medium`}>
                        distributed floor
                    </button>
                    <button onClick={() => duplicateFloor(floorIndex)} className='flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center text-primary bg-white text-base font-medium'>
                        duplicate Floor
                    </button>
                    </div>
            </div>
    </div>
    </div>
   
  )
}

export default Floor