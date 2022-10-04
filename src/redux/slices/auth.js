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
    setUserInfo: (state, action) => {
      const { user, token } = action.payload
      return {
        ...state,
        user,
        token,
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.login + fulfilled, (state, { payload }) => {
      const { status, token, user } = payload;
      if (status) {
        state.token = "Bearer " + token;
        state.user = user;
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
  setUserInfo
} = auth.actions;

export default auth.reducer;
