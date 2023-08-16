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
        <button className='flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center bg-primary text-white text-base font-medium'>
            Add Project
        </button>
        </Link>
    </header>
  )
}

export default NetxHeader