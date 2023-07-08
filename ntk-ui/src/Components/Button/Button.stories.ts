import { Meta , StoryObj } from "@storybook/react"; 
import Button from './Button'; 

const meta: Meta<typeof Button> = {
    title: 'Components/Button', 
    component: Button, 
    tags: ['autodocs'],
}

export default meta; 

type Story = StoryObj<typeof Button>; 

export const Primary: Story = {
    args: {
        color: 'primary', 
        label: 'Our Button'
    }, 
    argTypes: {
        color: {
            control: false
        },
        size: {
            control: {
                type:'select', 
                options: ['large' , 'medium' , 'small' , 'flex']
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



