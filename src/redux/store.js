import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import event from "./slices/event";

const store = configureStore({
  reducer: {
    auth,
    event,
  },
});

export { store };