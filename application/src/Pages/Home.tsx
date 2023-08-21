import React, { useEffect } from 'react'
import HomeIcon from '../assets/home.svg';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const nav = useNavigate(); 
  useEffect(() => {
    nav('/netx');
  } , [])
  return (
    <div className='w-full h-[100vh] overflow-y-hidden'>
      <img src={HomeIcon} className='object-contain w-full'/>
    </div>

  )
}

export default Home