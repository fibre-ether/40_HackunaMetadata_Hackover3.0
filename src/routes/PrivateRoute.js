import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../helpers/main";

export const PrivateRoute = () => {
  const { isAuth } = isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};
