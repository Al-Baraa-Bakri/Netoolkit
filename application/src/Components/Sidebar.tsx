import React from 'react'
import SidebarItem, { sidebarItemProps } from './Atoms/SidebarItem'
import { closeSidebar } from '../Store/store'
import { useSelector,  useDispatch } from 'react-redux'
import Logo from '../assets/logo.svg';
import NetxIcon from '../assets/netx.svg';
import { useAuth0 } from '@auth0/auth0-react'
const sidebarItms: sidebarItemProps[] = [
  {
    title: 'Netx',
    icon: NetxIcon, 
    href:'/netx' 
  },
    {
    title: 'Graph',
    icon: NetxIcon, 
    href:'/graph' 
  }, 
    {
    title: 'ip',
    icon: NetxIcon, 
    href:'/ip' 
  }
]

const Sidebar = () => {
  const isSidebarOpen = useSelector((state: any) => state.sidebar.isSidebarOpen);
  const theme = useSelector((state: any) => state.theme.theme);
  const { logout } = useAuth0();
  

  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  }
  const handleLogout = () => {
    logout()
  }

  return (
    <div className={`${theme === 'light' ? 'bg-sidebar-background-light' : 'bg-sidebar-background-dark' } bg-sidebar-background-${theme} ${isSidebarOpen ? 'w-64 ' : 'w-0 !px-0 py-0'} px-6 py-7 shadow-sm overflow-hidden transition-width ease-in-out duration-300`}>
      <div className={`flex flex-col gap-9 h-full  ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}  transition-opacity ease-in-out duration-100`}>
        <header className={`w-full flex items-center justify-between`}>
          <img src={Logo}/>
          <div className='flex flex-col gap-1 w-6 cursor-pointer' onClick={() => handleCloseSidebar()}>
              <span className='block h-[2px] w-full bg-[#87898b]'></span>
              <span className='block h-[2px] w-full bg-[#87898b]'></span>
              <span className='block h-[2px] w-full bg-[#87898b]'></span>
          </div>
        </header>
        <div className='flex-1 flex flex-col gap-[10px]'>
            {sidebarItms.map((item) =>  {
              return (
                <SidebarItem {...item}/>
              )
            })}
        </div>
        <div className='flex flex-col gap-6'>
          <SidebarItem title='Settings' icon={NetxIcon} href='/Settings' />
          <div onClick={() => handleLogout()}>
            <SidebarItem title='Log out' icon={NetxIcon} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar