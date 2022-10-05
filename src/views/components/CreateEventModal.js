import { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createEvent } from "../../redux/actions/eventActions";

export default function CreateEventModal() {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const name = ref.current[0].value;
    const category = ref.current[1].value;
    const price = ref.current[2].value;
    const description = ref.current[3].value;
    const poster_link = ref.current[4].value;
    const venue = ref.current[5].value;
    const starts_at = ref.current[6].value;
    const ends_at = ref.current[7].value;
    //need to add validation
    const createEventData = {
      name,
      category,
      price,
      description,
      poster_link,
      venue,
      starts_at,
      ends_at,
    };
    dispatch(createEvent(createEventData));
    setShow(false);
  };

  return (
    <div className="font-poppins">
      <button className="btn btn-md add_event_btn p-3" onClick={handleShow}>
        <div className="row">
          <div className="col-auto g-0">
            <AiOutlinePlus size={30} />
          </div>
          <div className="col-auto g-0">Add an Event</div>
        </div>
      </button>

      <Modal
        className="font-poppins"
        show={show}
        onHide={handleClose}
        backdrop="static">
        <div className="d-flex justify-content-between mt-3 mb-3">
          <div className="p-2 modal_header">Create an event</div>
          <div onClick={handleClose}>
            <button className="btn btn-lg modal_dismiss_btn">
              <AiOutlineClose size={35} />
            </button>
          </div>
        </div>
        <Modal.Body>
          <Form
            onSubmit={() => {
              console.log("submitted");
            }}
            ref={ref}>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm={3}>
                Name<span className="text-red-500">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Name" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="category">
              <Form.Label column sm={3}>
                Category<span className="text-red-500">*</span>
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
                Description<span className="text-red-500">*</span>
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
                Venue<span className="text-red-500">*</span>
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
                <Form.Control type="date" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="ends_at">
              <Form.Label column sm={3}>
                Ends at
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="date" />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-lg btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
