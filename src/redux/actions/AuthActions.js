import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import toast from "react-hot-toast";
import { AXIOS } from "../../helpers/axios";
import { auth } from "./actions";

const loginUser = createAsyncThunk(
  auth.login,
  async ({ sap, password }, thunkAPI) => {
    thunkAPI.dispatch(setLoader("loading"));
    try {
      const response = await AXIOS.post("apiRoute", {
        sap,
        password,
      });
      const responseData = response.data;
      if (responseData.token) {
        const { /* deconstruct */ } = responseData;
        localStorage.setItem(
          "user",
          JSON.stringify({ /* put deconstructed stuff here */ })
        );
        localStorage.setItem("token", "Bearer " + "token" /*put token here*/);

        thunkAPI.dispatch(setLoader("success"));

        toast.success("Successfully Logged in");
        return { token: "token" /* put token here */, status: 200 };
      }
    } catch (error) {
      thunkAPI.dispatch(setLoader("error"));
      toast.error("Invalid credentials");
      return thunkAPI.rejectWithValue({ error: error?.message });
    }
  }
);

const logoutUser = createAction(auth.logout);

const setLoader = createAction(auth.setLoader);

export { setLoader, loginUser, logoutUser };
