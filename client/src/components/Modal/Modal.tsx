import { useState, useContext } from 'react'
import axios from "axios"
import styled from "styled-components"
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context"

interface ModalProps {
    text: string;
    variant: "primary" | "secondary" | "danger";
    isSignupFlow: boolean;
}

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`


function ModalComponent({ text, variant, isSignupFlow }: ModalProps) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()

    const [state, setState] = useContext(UserContext)
    
    const handleClick = async () => {
        let response

        if(isSignupFlow) {
            const {data: signUpData} = await axios.post("http://localhost:8080/auth/signup", {
                email,
                password
            })
            response = signUpData
        } else {
            const {data: loginData} = await axios.post("http://localhost:8080/auth/login", {
                email,
                password
            })
            response = loginData
        }

        if(response.errors.length) {
            return setErrorMessage(response.errors[0].msg)
        }

        setState({
            data: {
                id: response.data.user.id,
                email: response.data.user.email,
                customerStripeId: response.data.user.customerStripeId
            },
            loading: false,
            error: null
        })

        localStorage.setItem("token", response.data.token)
        axios.defaults.headers.common["authorization"] = `Bearer ${response.data.token}`
        navigate("/articles")
    }

    return (
      <>
        <Button variant={variant} onClick={handleShow} size="lg" style={{ marginRight: "1rem", padding:"0.5rem 1.4rem"}}>
        { text }
        </Button>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>{ text }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Email</InputGroup.Text>
                    <FormControl 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Password</InputGroup.Text>
                    <FormControl 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Modal.Body>
            <Modal.Footer>
                
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClick}>{ text }</Button>
            </Modal.Footer>
        </Modal>
       
      </>
    );
}

export default ModalComponent