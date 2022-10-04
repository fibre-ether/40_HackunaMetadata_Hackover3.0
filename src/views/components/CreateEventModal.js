import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from 'react-icons/ai'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function CreateEventModal() { 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div className="font-poppins">
        <button className="btn btn-primary" onClick={handleShow}>
        Create an event
        </button>
  
        <Modal className="font-poppins" show={show} onHide={handleClose} backdrop="static">
        <div className="d-flex justify-content-between mt-3 mb-3">
            <div className="p-2 modal_header">Create an event</div>
            <div onClick={handleClose}><button className="btn btn-lg modal_dismiss_btn"><AiOutlineClose size={35}/></button></div>
        </div>
          <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm={3}>
                Name
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Name" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="category">
                <Form.Label column sm={3}>
                Category
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Category" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="price">
                <Form.Label column sm={3}>
                Price
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Price" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="description">
                <Form.Label column sm={3}>
                Description
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Description" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="poster_link">
                <Form.Label column sm={3}>
                Poster Link
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Link" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="venue">
                <Form.Label column sm={3}>
                Venue
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Venue" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="starts_at">
                <Form.Label column sm={3}>
                Starts at
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="date"/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="ends_at">
                <Form.Label column sm={3}>
                Ends at
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="date"/>
                </Col>
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-lg btn-primary" onClick={handleClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );

}