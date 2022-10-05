import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from 'react-icons/ai'
import { Card } from "react-bootstrap";
import RazorPay from "./razorPay";

export default function EventInsightModal(props) { 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div className="font-poppins">
        <button className="btn btn-md btn-success btn-radius-0" onClick={handleShow}>View</button>
  
        <Modal className="font-poppins" show={show} onHide={handleClose}>
            <Modal.Header>
                <Card>
                    <Card.Img src={props.item.poster_link}/>
                    <Card.ImgOverlay><div className="row"><div className="offset-10" onClick={handleClose}><button className="btn btn-lg modal_dismiss_btn"><AiOutlineClose size={35} style={{color:"white"}}/></button></div></div></Card.ImgOverlay>
                </Card>
            </Modal.Header>
          <Modal.Body>
            <div className="row">
                <div className="col-12 modal_header">{props.item.name}</div>
                <div className="col-12 events_card_desc">{props.item.category}</div>
                <div className="col-12 mt-3 mb-3">{props.item.description}</div>
                <div className="col-12">{props.item.starts_at} - {props.item.ends_at}</div>
                <div className="col-12 mt-3">
                    {props.item.price ?
                        <div className="row">
                            <div className="col-6 col-lg-4"><button className="btn btn-md btn-danger w-100" disabled>&#8377; {props.item.price}</button></div>
                            <div className="col-6 col-lg-4" onClick={handleClose}><RazorPay amount={props.item.price}/></div>
                        </div>:
                        <button className="btn btn-md btn-success" disabled>Free</button>
                        }
                </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );

}