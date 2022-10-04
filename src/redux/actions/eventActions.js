import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AXIOS } from "../../helpers/axios";
import { setLoader } from "../slices/event";
import { event } from "./actions";

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

export { getAllEvents };
