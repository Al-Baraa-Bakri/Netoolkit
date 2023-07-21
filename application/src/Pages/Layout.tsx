import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
const Layout = () => {
  return (
    <main className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar />
        <Outlet />
      </div>
    </main>
  )
}

export default Layout