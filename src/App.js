import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UserRoute from "./routes/UserRoute";

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster position="top-right" />
        <BrowserRouter>
          <Routes>

            <Route path="/" name="login" element={<Login />} />

            <Route route="/user" element={<UserRoute />}>
            </Route>

            <Route path="*" name="404" element={<>404</>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
