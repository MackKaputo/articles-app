import { Link } from "react-router-dom"
import { Navbar, NavItem, NavLink } from "react-bootstrap"

export default function Nav() {
  return (
    <Navbar bg="dark">
        <NavItem >
            <NavLink style={{ color: "white"}}>
              <Link to="/"style={{textDecoration:"none"}}> Home </Link> 
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink> Home </NavLink>
        </NavItem>
    </Navbar>
  )
}
