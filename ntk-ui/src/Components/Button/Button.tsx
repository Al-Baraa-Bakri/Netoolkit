import React from "react";
import './button.scss';

export type ButtonProps = {
    color: 'primary' | 'secondary' | 'danger', 
    label: string, 
    size: 'small' | 'medium' | 'large' | 'flex', 
    variant: 'text' | 'contained' | 'outlined'
}
const Button = ( props: ButtonProps ) => {
  const color = props.color || 'primary'; 
  const label = props.label || 'ntk-btn';
  const size = props.size || 'large'; 
  const variant = props.variant || 'contained'; 

  return (
    <button className="ntk-btn">
      { label }
    </button>
  )
}

export default Button;