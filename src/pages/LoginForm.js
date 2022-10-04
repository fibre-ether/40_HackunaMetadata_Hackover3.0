import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setLoader } from "../redux/actions/AuthActions";
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function LoginForm() {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("user");
  const { authLoader } = useSelector((state) => state.auth);

  let navigate = useNavigate();

  useEffect(() => {
    if (authLoader === "loginSuccess") {
      navigate("/user/home");
    }
    //eslint-disable-next-line
  }, [authLoader]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      loginUser({ email: credentials.email, password: credentials.password, role: userType })
    );
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Card.Body>
        
        <Card.Title>
        
        </Card.Title>
        <div className="mt-3 mb-3 d-flex justify-content-center">
        <div className="login_signup_header">Sign In To Your Account</div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="mb-5 mt-5 row">
            <div className="col-12 offset-md-2 col-md-8"><FloatingLabel
            controlId="floatingInput"
            label="Email address" htmlFor="email"
            className="mb-3">
                <Form.Control controlid="email" name="email" type="email" placeholder="name@example.com" value={credentials.email}
                required onChange={handleChange} />
            </FloatingLabel>
            </div>
            <div className="col-12 offset-md-2 col-md-8"><FloatingLabel
            controlId="floatingPassword"
            label="Password" htmlFor="password"
            className="mb-3">
                <Form.Control controlid="password" name="password" type="password" placeholder="Password" value={credentials.password}
                required onChange={handleChange} />
            </FloatingLabel>
            </div>
            <div className="col-12 offset-md-2 col-md-8 mt-3">
            <button
                className="navy-btn w-100 justify-center rounded-md border border-transparent py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold text-lg disabled:bg-indigo-400 "
                disabled={authLoader==="loading"}
                >
                {authLoader==="loading" ? "Signing in..." : "Sign in"}
            </button>
            </div>
        </div>
        </form>
        <div className="d-flex flex-row-reverse mb-3">
        <div><Link onClick={()=>{dispatch(setLoader("idle"))}} to="/register">Don't have an account?</Link></div>
        </div>
    </Card.Body>
  );
}

export default LoginForm;
