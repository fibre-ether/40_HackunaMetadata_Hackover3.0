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
  const { categories, events, eventsByCats } = useSelector((state) => state.event);

  const event = {
    name: "hello world",
    category: "Hackathon",
    description:
      "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    poster_link:
      "https://images.pexels.com/photos/541484/sun-flower-blossom-bloom-pollen-541484.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    venue: "my house",
  };

  const event2 = {
    name: "hello world2",
    category: "Sports",
    description: "this is a sports event",
    poster_link:
      "https://a.storyblok.com/f/112937/568x464/82f66c3a21/all_the_english-_football_terms_you_need_to_know_blog-hero-low.jpg/m/620x0/filters:quality(70)/",
    venue: "sports ground",
  };

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getAllCategories());
    dispatch(getEventsByCategories({category: "Hackathon"}));
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
