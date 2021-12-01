import React from 'react'
import { Navbar, NavItem, NavLink } from "react-bootstrap"

export default function Nav() {
  return (
    <Navbar bg="dark">
        <NavItem >
            <NavLink style={{ color: "white"}}> Home </NavLink>
        </NavItem>
        <NavItem>
            <NavLink> Home </NavLink>
        </NavItem>
    </Navbar>
  )
}
