import { Meta , StoryObj } from "@storybook/react";
import SidebarItem from "./SidebarItem";

const iconSrc = './ip.svg';
const meta: Meta<typeof SidebarItem> = {
    title: 'Components/SidebarItem', 
    component: SidebarItem, 
    tags: ['autodocs'],
    args: {
        icon: iconSrc, 
        isActive: false, 
    },
    argTypes: {
        icon: {
            control: false
        }
    }

}; 

export default meta; 

type Story = StoryObj<typeof SidebarItem>;

export const withIcon: Story = {
    args: {
        title: 'Ip Convertor',  
    }
}

export const withoutIcon: Story = {
    args: {
        icon: '',
        title: 'Ip Convertor',  
    }
}