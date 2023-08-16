import React from 'react'
import { useSelector } from 'react-redux';

const ResultsHeader = ({projectName}) => {
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <div className='py-8 px-4 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
            <h1 className={`text-2xl font-bold ${theme==='light' ? 'text-title-light' : 'text-title-dark'} `}>
                Project Name: 
            </h1>
            <p className='text-primary font-bold text-xl'>{projectName}</p>
        </div>
        <button className='flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center bg-primary text-white text-base font-medium'>
            Gen-LAN Design
        </button>
    </div>
  )
}

export default ResultsHeader