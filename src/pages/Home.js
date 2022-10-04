import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  deleteEvent,
  getAllCategories,
  getAllEvents,
  updateEvent,
} from "../redux/actions/eventActions";

function Home() {
  const dispatch = useDispatch();
  const { categories, events } = useSelector((state) => state.event);

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
  }, [dispatch]);

  return (
    <>
      {categories.map((item, index) => {
        return (
          <div key={index}>
            {item}
          </div>
        )
      })}
      {events.map((item, index) => {
        return (
          <div key={index} className="">
            {" "}
            {item.name}{" "}
          </div>
        );
      })}
      <button
        onClick={() => {
          dispatch(createEvent(event));
        }}>
        click me to add
      </button>
      <button
        onClick={() => {
          dispatch(deleteEvent({ id: events[3]._id }));
        }}>
        Click me to delete
      </button>
      <button
        onClick={() => {
          dispatch(updateEvent({ id: events[3]._id, ...event2 }));
        }}>
        Click me to update
      </button>
    </>
  );
}

export default Home;
