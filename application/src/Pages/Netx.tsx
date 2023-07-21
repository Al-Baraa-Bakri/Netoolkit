
import React from 'react'
import { useSelector } from 'react-redux';
const Netx = () => {
 const isSidebarOpen = useSelector((state: any) => state.sidebar.isSidebarOpen); 
  return (
    <div> Netx </div>
  )
}

export default Netx;