import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import toast from "react-hot-toast";
import { AXIOS } from "../../helpers/axios";
import { auth } from "./actions";

const loginUser = createAsyncThunk(
  auth.login,
  async ({ email, password, role }, thunkAPI) => {
    thunkAPI.dispatch(setLoader("loading"));
    try {
      const response = await AXIOS.post("api/v1/user/login", {
        email,
        password,
        role,
      });
      const responseData = response.data;
      if (responseData.token) {
        const { token, name, email, role, myEvents, otherEvents, verified } = responseData;
        const user = {name, email, role, myEvents, otherEvents, verified}
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );
        localStorage.setItem("token", "Bearer " + token );

        thunkAPI.dispatch(setLoader("loginSuccess"));

        toast.success("Successfully Logged in");
        return { user, token, status: 200 };
      }
    } catch (error) {
      thunkAPI.dispatch(setLoader("error"));
      toast.error("Invalid credentials");
      return thunkAPI.rejectWithValue({ error: error?.message });
    }
  }
);

const registerUser = createAsyncThunk(
  auth.register,
  async ({ email, name, password, role, image }, thunkAPI) => {
    thunkAPI.dispatch(setLoader("loading"));
    try {
      const response = await AXIOS.post("api/v1/user/signup", {
        email,
        name,
        password,
        image,
        role,
      });
      const responseData = response.data;
      if (responseData.token) {
        console.log(responseData)

        thunkAPI.dispatch(setLoader("signUpSuccess"));

        toast.success("Successfully Registered");
        return { status: 200 };
      }
    } catch (error) {
      thunkAPI.dispatch(setLoader("error"));
      toast.error("Some error occured");
      return thunkAPI.rejectWithValue({ error: error?.message });
    }
  }
);

const logoutUser = createAction(auth.logout);

const setLoader = createAction(auth.setLoader);

export { setLoader, loginUser, registerUser, logoutUser };
