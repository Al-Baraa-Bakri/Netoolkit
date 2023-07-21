import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export type sidebarItemProps = {
  title: string, 
  icon: string, 
  href?: string
} 

const SidebarItem = (props : sidebarItemProps) => {
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <Link to={props.href} className='no-underline'>
        <div className={`w-full cursor-pointer p-2 flex justify-start items-center gap-2 rounded-md ${theme==='light' ? 'hover:bg-sidebarItem-hover-light' : 'hover:bg-sidebarItem-hover-dark'} `}>
          <img src={props.icon} alt={props.href?.slice(1) + 'icon'}/>
          <span className={`${theme === 'light' ? 'text-sidebarItem-text-light' : 'text-sidebarItem-text-dark' } text-sm`}>
              {props.title}
          </span>
        </div>
    </Link>

  )
}

export default SidebarItem