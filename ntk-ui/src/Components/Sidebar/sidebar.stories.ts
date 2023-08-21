import { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";
import SidebarItem, { SidebarItemProps } from "./SidebarItem";
import React from "react";

const logoSrc = "./logo.svg";

let sidebarItems: SidebarItemProps[] = [
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

  const handleActiveItem = (title: string) => {        
    const updatedList = sidebarItems.map((item) => {
      if(item.title === title) {
        return {...item , isActive: true}
      }
      if(item.isActive) {
        return {...item , isActive: false}
      }
      return item;
    }
  ) as SidebarItemProps[];  
    sidebarItems = updatedList;
  }

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  args: {
    logo: logoSrc,
    children: sidebarItems.map((item) => React.createElement(SidebarItem , {title: item.title , isActive: item.isActive, onClick: () => handleActiveItem(item.title)}))  
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Opened: Story = {
  args: {
    isOpened: true,
  },
};

export const Closed: Story = {
  args: {
    isClosed: true,
  },
};

export const JustIcon: Story = {
  args: {
    isJustIcons: true,
  },
};
