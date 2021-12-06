import styled from "styled-components"
import { Container } from "react-bootstrap"

const Message = styled.h1`
    text-align: center;
    font-size: 2rem;
    margin: 2%;
    padding: 10% 2%;
`
const NotFound = () => {
    return (
        <Container>
            <Message>
                Page Not Found.
            </Message>
        </Container>
    )
}

export default NotFound