import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AXIOS } from "../../helpers/axios";
import { setLoader } from "../slices/event";
import { event } from "./actions";

const getAllCategories = createAsyncThunk(event.getAllCats, async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoader("loading"));
  try {
    const response = await AXIOS.get("api/v1/event/allCategories");
    thunkAPI.dispatch(setLoader("success"));
    return { category: response.data.category };
  } catch (error) {
    thunkAPI.dispatch(setLoader("error"));
    toast.error("Some error occured:");
    console.log(error);
    return thunkAPI.reject;
  }
});

const getEventsByCategories = createAsyncThunk(event.getEventsByCats, async ({ category }, thunkAPI) => {
  thunkAPI.dispatch(setLoader("loading"));
  try {
    const response = await AXIOS.get(`api/v1/event/category?cat=${category}`);
    thunkAPI.dispatch(setLoader("success"));
    return { events: response.data.events };
  } catch (error) {
    thunkAPI.dispatch(setLoader("error"));
    toast.error("Some error occured:");
    console.log(error);
    return thunkAPI.reject;
  }
});

const getAllEvents = createAsyncThunk(event.getAll, async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoader("loading"));
  try {
    const response = await AXIOS.get("api/v1/event/all");
    thunkAPI.dispatch(setLoader("success"));
    return response.data.events;
  } catch (error) {
    thunkAPI.dispatch(setLoader("error"));
    toast.error("Some error occured:");
    console.log(error);
    return thunkAPI.reject;
  }
});

const createEvent = createAsyncThunk(
  event.create,
  async (
    {
      name,
      category,
      price,
      description,
      poster_link,
      venue,
      starts_at,
      ends_at,
    },
    thunkAPI
  ) => {
    console.log(
      name,
      category,
      price,
      description,
      poster_link,
      venue,
      starts_at,
      ends_at
    );
    thunkAPI.dispatch(setLoader("loading"));
    try {
      const response = await AXIOS.post("api/v1/event/create", {
        name,
        category,
        ...(price && { price }),
        description,
        ...(poster_link && { poster_link: poster_link }),
        venue,
        ...(starts_at && { starts_at }),
        ...(ends_at && { ends_at }),
      });
      const responseData = response.data;
      const { event, status } = responseData;
      thunkAPI.dispatch(setLoader("success"));
      return { event, status };
    } catch (error) {
      thunkAPI.dispatch(setLoader("error"));
      toast.error("Some error occured:");
      console.log(error);
      return thunkAPI.reject;
    }
  }
);

const updateEvent = createAsyncThunk(
  event.update,
  async (
    {
      id,
      name,
      category,
      price,
      description,
      poster_link,
      venue,
      starts_at,
      ends_at,
    },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setLoader("loading"));
    console.log(id);
    try {
      const response = await AXIOS.put("api/v1/event/update", {
        id, data: {
          ...(name && { name: name }),
          ...(category && { category: category }),
          ...(price && { price: price }),
          ...(description && { description: description }),
          ...(poster_link && { poster_link: poster_link }),
          ...(venue && { venue: venue }),
          ...(starts_at && { starts_at: starts_at }),
          ...(ends_at && { ends_at: ends_at }),
        }
      });
      const { message } = response.data;
      thunkAPI.dispatch(setLoader("success"));
      //TODO: ask to send updates value form backend
      return { id, message };
    } catch (error) {
      thunkAPI.dispatch(setLoader("error"));
      toast.error("Some error occured:");
      console.log(error);
      return thunkAPI.reject;
    }
  }
);

const deleteEvent = createAsyncThunk(event.delete, async ({ id }, thunkAPI) => {
  thunkAPI.dispatch(setLoader("loading"));
  console.log(id);
  try {
    const response = await AXIOS.delete("api/v1/event/delete", {
      data: { id },
    });
    const { message } = response.data;
    thunkAPI.dispatch(setLoader("success"));
    return { id, message };
  } catch (error) {
    thunkAPI.dispatch(setLoader("error"));
    toast.error("Some error occured:");
    console.log(error);
    return thunkAPI.reject;
  }
});

export { getAllCategories, getEventsByCategories, getAllEvents, createEvent, deleteEvent, updateEvent };
