import { useState } from 'react'
import axios from "axios"
import styled from "styled-components"
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

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
    
    const handleClick = async () => {
        let data 

        if(isSignupFlow) {
            const {data: signUpData} = await axios.post("http://localhost:8080/auth/signup", {
                email,
                password
            })
            data = signUpData
        } else {
            const {data: loginData} = await axios.post("http://localhost:8080/auth/login", {
                email,
                password
            })
            data = loginData
        }

        if(data.errors.length) {
            setErrorMessage(data.errors[0].msg)
        }

        localStorage.setItem("token", data.data.token)
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