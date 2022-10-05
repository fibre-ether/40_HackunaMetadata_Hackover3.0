import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../redux/actions/eventActions";
import { AiOutlinePlus } from 'react-icons/ai';
import dummyimage from "../assets/event-image.jpg";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CreateEventModal from "../views/components/CreateEventModal";

function Home() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

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
              <Card className="h-100">
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
                          <Button variant="dark" disabled>{item.category}</Button>
                        }
                        {item.category==="Sports" &&
                          <Button variant="dark" disabled>{item.category}</Button>
                        }
                        {item.price ?
                        <Button variant="danger" disabled>&#8377; {item.price}</Button>:
                        <Button variant="success" disabled>Join</Button>
                        }
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
