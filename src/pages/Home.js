import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, getAllCategories, getEventsByCategories } from "../redux/actions/eventActions";
import dummyimage from "../assets/event-image.jpg";
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import EventInsightModal from "../views/components/EventInsightModal";
import CreateEventModal from "../views/components/CreateEventModal";

function Home() {
  const dispatch = useDispatch();
  const { categories, events, eventsByCats } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getAllCategories());
  }, [dispatch]);
  
  return (
    <div className="container font-poppins">
        { (user.role==="admin" || (user.role=="organizer" && user.verified) || user.role==="user") && 
          <div className="d-flex flex-row-reverse">
            <select className="col-7 col-md-5 col-lg-3 p-2 select_filter" onChange={(e)=>{dispatch(getEventsByCategories({category: e.target.value}));}}>
              <option selected>All</option>
            {categories.map((item, index) => {
          return (
            <option key={index}>{categories[index]}</option>
          );
        })}
            </select>
          </div>
        }
      <div className="row mt-5">
        { (user.role==="admin" || (user.role==="organizer" && user.verified)) && 
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex align-items-center justify-content-center">
                <CreateEventModal/>
              </Card.Body>
            </Card>
          </div>
        }

        { (user.role==="admin" || (user.role==="organizer" && user.verified) || (user.role==="user")) && 
        <>
        {eventsByCats.length ?
        <>
        {eventsByCats.map((item, index) => {
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
        })}</>:
        <>
        {events.map((item, index) => {
          console.log("kjbwa")
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
        </>
        }
        </>
        }
        {
          ((user.role==="organizer" && !user.verified)) && 
          <div className="col-12 mt-3 mb-5">
            <h1 className="text-red-500 modal_header mb-5">You are not verified. Kindly verify your account to get access.</h1>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
