import { Link } from "react-router-dom"
import { Navbar, NavItem, NavLink } from "react-bootstrap"
import { useContext } from "react"
import { UserContext } from "../../context"

export default function Nav() {

  const [state, setState] = useContext(UserContext) //state as name
  console.log("state", state)

  return (
    <Navbar bg="dark">
        <NavItem >
            <NavLink style={{ color: "white"}}>
              <Link to="/"style={{textDecoration:"none"}}> Home </Link> 
            </NavLink>
        </NavItem>
        
    </Navbar>
  )
}
