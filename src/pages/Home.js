import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../redux/actions/eventActions";
import dummyimage from "../assets/event-image.jpg";
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import EventInsightModal from "../views/components/EventInsightModal";
import CreateEventModal from "../views/components/CreateEventModal";

function Home() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div className="container font-poppins">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center justify-content-center">
              <CreateEventModal/>
            </Card.Body>
          </Card>
        </div>
        {events.map((item, index) => {
          return (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <Card className="h-100" onClick={handleShow}>
                <img src={item.poster_link || dummyimage} className="card-img-top img-fluid" alt=""/>
                <Card.Body>
                  <Card.Title className="events_card_header">{item.name}</Card.Title>
                  <Card.Text className="events_card_desc">
                    {item.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <div className="mt-2 mb-2 row">
                    <div className="col-12">
                      <ButtonGroup className="w-100">
                        {item.category==="Hackathon" &&
                          <button className="btn btn-md btn-dark" disabled>{item.category}</button>
                        }
                        {item.category==="Sports" &&
                          <button className="btn btn-md btn-dark" disabled>{item.category}</button>
                        }
                        {item.price ?
                        <button className="btn btn-md btn-danger" disabled>&#8377; {item.price}</button>:
                        <button className="btn btn-md btn-success" disabled>Join</button>
                        }
                        <EventInsightModal item={item} />
                      </ButtonGroup>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
