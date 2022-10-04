import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../redux/actions/eventActions";

function Home() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <>
      {events.map((item, index) => {
        return (
          <div key={index} className="">
            {" "}
            {item.name}{" "}
          </div>
        );
      })}
    </>
  );
}

export default Home;
