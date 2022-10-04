import { createSlice } from "@reduxjs/toolkit";
import {auth as authActions, fulfilled} from "../actions/actions";

const auth = createSlice({
  name: "auth",
  initialState: {
    token: "",
    authLoader: "idle",
  },
  reducers: {
    //TODO: move this to extrareducers or move non async extrareducers here (for clean code. Low priority)
    setToken: (state, action) => {
      const  token = action.payload
      return {
        ...state,
        token,
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.login + fulfilled, (state, { payload }) => {
      const { status, token } = payload;
      if (status) {
        state.token = "Bearer " + token;
      }
    });
    builder.addCase(authActions.setLoader, (state, { payload }) => {
      state.authLoader = payload;
    });
    builder.addCase(authActions.logout, (state) => {
      state.token = "";
      state.authLoader = "idle";
    });
  },
});

export const {
  setToken
} = auth.actions;

export default auth.reducer;
