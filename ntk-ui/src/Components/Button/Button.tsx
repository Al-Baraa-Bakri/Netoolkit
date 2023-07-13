import React from "react";
import './button.scss';

export type ButtonProps = {
    color: 'primary' | 'secondary' | 'danger', 
    label: string, 
    size: 'small' | 'medium' | 'large', 
    variant: 'text' | 'contained' | 'outlined', 
    isFlex: boolean
}
const Button = ( props: ButtonProps ) => {
  const color = props.color || 'primary'; 
  const label = props.label || 'ntk-btn';
  const size = props.size || 'large'; 
  const variant = props.variant || 'contained'; 
  const isFlex = props.isFlex || false; 

  const className = `ntk-btn ntk-btn__${color} ntk-btn__${color}__${variant} ntk-btn__${size} ${isFlex && 'ntk-btn__flex'}`
  return (
    <button className={className}>
      { label }
    </button>
  )
}

export default Button;