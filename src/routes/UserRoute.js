import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setToken } from "../redux/slices/auth";
import { PrivateRoute } from "./PrivateRoute";

function UserRoute() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = {
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("token"),
    };
    
    dispatch(setToken(userInfo.token));
    //dispatch(setUserInfo(userInfo.user));
  }, [dispatch]);

  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
}

export default UserRoute;
