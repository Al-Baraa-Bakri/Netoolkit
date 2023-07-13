import React from 'react'

export type NavbarProps = {
    isLogged: boolean
}

const Navbar = (props: NavbarProps) => {
    const {isLogged} = props; 
  return (
    <div>Navbar</div>
  )
}

export default Navbar