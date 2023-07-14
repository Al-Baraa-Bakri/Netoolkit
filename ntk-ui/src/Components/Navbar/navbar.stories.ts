import { Meta , StoryObj } from "@storybook/react";
import Navbar from "./Navbar";

const meta: Meta<typeof Navbar> = {
    title: 'Components/Navbar', 
    component: Navbar, 
    tags: ['autodocs'],
}; 

export default meta; 

type Story = StoryObj<typeof Navbar>;

export const Logged: Story = {

}

export const AnLogged: Story = {
    
}