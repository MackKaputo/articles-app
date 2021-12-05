import { Link, useNavigate } from "react-router-dom"
import { Navbar, NavItem, NavLink } from "react-bootstrap"
import { useContext } from "react"
import { UserContext } from "../../context"
import styled from "styled-components"


const RightNavContainer = styled.div`
  margin-left: auto;
  border: red solid 1px;
`

export default function Nav() {

  const [state, setState] = useContext(UserContext) //state as name
  
  const navigate = useNavigate()

  const handleLogout = () => {
    setState({data: null, loading: false, error: null})
    localStorage.removeItem("token")
    navigate("/")

  }

  return (
    <Navbar bg="dark">
        <NavItem >
            <NavLink style={{ color: "white"}}>
              <Link to="/"style={{textDecoration:"none", color:"white", fontWeight: "bolder"}}> Home </Link> 
            </NavLink>
        </NavItem>
        {state.data && (
          <RightNavContainer>
            <NavItem >
              <NavLink style={{ color: "white", }} onClick={handleLogout}>
                Logout 
              </NavLink>
            </NavItem>
          </RightNavContainer>
          
        )}
        
    </Navbar>
  )
}
