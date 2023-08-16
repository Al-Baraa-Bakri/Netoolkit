import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axiosInstance from '../../Logic/axios';


const ResultsTable = ({project , buildings , projectResults} : any) => {
  console.log(buildings);
  
  const theme = useSelector((state: any) => state.theme.theme);
  const RESULTS = {
    "outlet Box UTP CAT6": projectResults.outletBox, 
    "Drop Cable UTP CAT6 per node (3 meter)": projectResults.dropCableUTP, 
    "patch cord UTP cAT6 (1 meter)": projectResults.patchCord1m, 
    "patch panel UTP CAT6 / 48 port": projectResults.patchPanelUTP, 
    "fiber optic cable / indoor / multi-mode / 8 cores": projectResults.fiberOpticCablesIN, 
    "fiber optic cable / outdoor / multi-mode / 8 cores": projectResults.fiberOpticCablesOut, 
    "patch cord fiber optic (1 meter)": projectResults.patchCord, 
    "patch panel fiber optic (lIU/ shelve) / 6 ports": projectResults.patchPanelFiberOptic, 
    "access switch 48 ports (10/1000 Mbps) + 2 sX (1000 Mbps)": projectResults.accessSwitch48, 
    "Distributer switch 8 SX ports / (10/100/1000 mbps)": projectResults.distributedSwitch, 
    "core switch l3 16 SX ports (10/100/1000 Mbps)": projectResults.layer3CoreSwitch, 
    "Patch Cord (10m)": projectResults.patchCord10m,
    "wall Cabinet (15U)": projectResults.wallCabinets, 
    "rack Cabinet (42U)": projectResults.rack, 
    
  }
  return (
    buildings.length >0 && <div className='w-full overflow-x-scroll scrollbar scroll-m-0'>
        {/* Header */}
        <div className='w-full flex items-center bg-[#F7F9FD] py-6 px-4'>
            <h2 className={` flex-1 text-xl font-bold ${theme==='light' ? 'text-title-light' : 'text-title-dark'} `}>
                unit name
            </h2>
            <div className='w-[70%] gap-24 flex items-center'>
            {
                buildings?.map((building , i) => {
                    return <h2 className={`w-20 text-center text-xl font-bold ${theme==='light' ? 'text-title-light' : 'text-title-dark'} `}>
                        {`bul${i + 1}`}
                    </h2>
                })
            }
              <h2 className={`w-20 text-center text-xl font-bold ${theme==='light' ? 'text-title-light' : 'text-title-dark'} `}>
                          Total
              </h2>
            </div>
        </div>
        {/* Results */}
        <div className='flex flex-col w-full'>
          {
            Object.keys(RESULTS).map((r , i) => {
              return (
                <div className={`flex w-full items-center py-6 px-4 ${i === 0 || i % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FD]'}`}> 
                    <span className='flex-1 font-medium'> {r} </span>
                    <div className='w-[70%] gap-24 flex items-center  font-medium'>
                      {
                        Object.keys(RESULTS[r]).map((k: any) => {
                          return (
                            <span className='w-20 text-center'> {RESULTS[r][k]} </span>
                          )
                        })
                      }
                      
                    </div>

                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default ResultsTable