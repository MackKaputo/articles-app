import { useState } from 'react'

import { Button, Modal, InputGroup, FormControl } from "react-bootstrap"


interface ModalProps {
    text: string;
    variant: "primary" | "secondary" | "danger"
}



function ModalComponent({ text, variant }: ModalProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
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
                    <FormControl type="email" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Password</InputGroup.Text>
                    <FormControl type="password" />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary">{ text }</Button>
            </Modal.Footer>
        </Modal>
       
      </>
    );
}

export default ModalComponent