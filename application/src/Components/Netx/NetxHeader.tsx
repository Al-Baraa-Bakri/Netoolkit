import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NetxHeader = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <header className='w-full flex justify-between items-center'>
        <h1 className={`text-3xl font-bold ${theme==='light' ? 'text-title-light' : 'text-title-dark'} `}>
            Netx
        </h1>
        <Link to={'create'}>
          
        <button className='flex py-5 px-4 w-[192px] h-[12px] rounded-[5px] items-center justify-center bg-primary text-white text-base font-medium'>
            <span>Add Project</span>
        </button>
        </Link>
    </header>
  )
}

export default NetxHeader