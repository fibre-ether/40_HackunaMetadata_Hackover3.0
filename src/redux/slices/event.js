import { createSlice } from "@reduxjs/toolkit";
import { event as eventActions, fulfilled } from "../actions/actions";

const event = createSlice({
  name: "event",
  initialState: {
    events: [],
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
  },
});

export const { setLoader } = event.actions;

export default event.reducer;
