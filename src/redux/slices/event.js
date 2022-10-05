import { createSlice } from "@reduxjs/toolkit";
import { event as eventActions, fulfilled } from "../actions/actions";

const event = createSlice({
  name: "event",
  initialState: {
    events: [],
    eventsByCats: [],
    categories: [],
    eventLoader: "idle",
  },
  reducers: {
    setLoader: (state, action) => {
      return {
        ...state,
        eventLoader: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(eventActions.getAll + fulfilled, (state, { payload }) => {
      console.log(payload);
      state.events = payload;
    });
    builder.addCase(eventActions.create + fulfilled, (state, { payload }) => {
      console.log(payload);
      state.events = [...state.events, payload.event];
    });
    builder.addCase(eventActions.delete + fulfilled, (state, { payload }) => {
      console.log(payload);
      state.events = state.events.filter((event) => {return event._id !== payload.id})
    });
    builder.addCase(eventActions.update + fulfilled, (state, { payload }) => {
      console.log(payload);
      //state.events = state.events.filter((event) => {return event._id !== payload.id})
    });
    builder.addCase(eventActions.getAllCats + fulfilled, (state, { payload }) => {
      console.log(payload);
      state.categories = payload.category;
    });
    builder.addCase(eventActions.getEventsByCats + fulfilled, (state, { payload }) => {
      console.log(payload);
      state.eventsByCats = payload.events || [];
    });
  },
});

export const { setLoader } = event.actions;

export default event.reducer;
