import React , {useState , PropsWithChildren, JSXElementConstructor, ReactElement} from 'react'
import './sidebar.scss';
import SidebarItem, { SidebarItemProps } from './SidebarItem';
export type SideProps = {
    isOpened?: boolean, 
    isClosed?: boolean, 
    isJustIcons?: boolean, 
    logo: string, 
}

const sidebarItems: SidebarItemProps[] = [
  {
    title: "NetX", 
    icon: './ntk.svg', 
    isActive: false
  }, 
    {
    title: "NetGraph", 
    icon: './ip.svg', 
    isActive: true
  }, 
    {
    title: "IPv4 to IPv6 Converter", 
    icon: './convertor.svg', 
    isActive: false
  }, 
]

const Sidebar = (props: PropsWithChildren<SideProps>) => { 
  const sidebarState =   props.isOpened ? 'opened' : props.isClosed ? 'closed' : props.isJustIcons ? 'icons' : 'opened';
  const {logo , isJustIcons} = props;
  const [itemsActivities , setItemsActivities] = useState(sidebarItems.map((item) => {
    return {
      title: item.title, 
      isActive: item.isActive,
    }
  }));

  const handleActiveItem = (title: string) => {    
    const updatedList = itemsActivities.map((item) => {
      if(item.title === title) {
        return {...item , isActive: true}
      }
      if(item.isActive) {
        return {...item , isActive: false}
      }
      return item;
    }
  ) as SidebarItemProps[];  
    setItemsActivities(updatedList);
  }
  return (
    <nav className={`ntk-sidebar ntk-sidebar__${sidebarState}`}>
      {/* Header */}
        <header className='ntk-sidebar--header'>
            <img src={logo} alt='Logo'/>
        </header>
        {/* Body */}
        <div className={`ntk-sidebar--body ntk-sidebar__${sidebarState}--body`}>
            {
             React.cloneElement(props.children[0] as ReactElement, {isOpened: props.isOpened , isClosed: props.isClosed , isJustIcon: props.isJustIcons})
            }
        </div>
    </nav>
  )
}

export default Sidebar