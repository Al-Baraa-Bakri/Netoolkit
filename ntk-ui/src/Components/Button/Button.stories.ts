import { Meta , StoryObj } from "@storybook/react"; 
import Button from './Button'; 

const meta: Meta<typeof Button> = {
    title: 'Components/Button', 
    component: Button, 
    tags: ['autodocs'],
        argTypes: {
        color: {
            control: false
        },
        size: {
            control: {
                type:'select', 
                options: ['large' , 'medium' , 'small']
            }
        },
        
        variant: {
            control: {
                type:'select', 
                options: ['text' , 'contained' , 'outlined']
            }
        }
    }
}

export default meta; 

type Story = StoryObj<typeof Button>; 

export const Primary: Story = {
    args: {
        color: 'primary', 
        label: 'Netoolkit Button', 

    }, 
}

export const Secondary: Story = {
    args: {
        color: 'secondary', 
        label: 'Second',
        size: 'small'
    }, 

}

export const Danger: Story = {
    args: {
        color: 'danger', 
        label: 'Delete', 
        variant: 'outlined', 
    }, 

}

