import React from 'react'
import "./sidebar-item.scss";

export type SidebarItemProps = {
  icon?: string, 
  title: string,
  isActive: boolean, 
  isJustIcons?:boolean,
  isOpened?: boolean, 
  isClosed?: boolean, 
  onClick?: () => void
}
const SidebarItem = (props: SidebarItemProps) => {
  const { icon , title, isActive , isOpened , isJustIcons , isClosed , onClick } = props; 
  console.log(isOpened , isClosed , isJustIcons);
  
  return (
    <div className={`ntk-sidebar-item ntk-sidebar-item__${isActive && 'active'} `} onClick={() => onClick && onClick()}>
      {/* Icon */}
      {icon && <img src={icon}/>} 
      {/* Title */}
      <h3 className='ntk-sidebar-item--title'> {title} </h3>
    </div>
  )
}

export default SidebarItem