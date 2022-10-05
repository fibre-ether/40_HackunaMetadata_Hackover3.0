import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registerUser } from "../redux/actions/AuthActions";
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
//import cx from "classnames";

function Register() {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({ name: "", password: "", email: "", image: "" });
  const [userType, setUserType] = useState("user");
  const { authLoader } = useSelector((state) => state.auth);

  let navigate = useNavigate();

  useEffect(() => {
    if (authLoader === "signUpSuccess") {
      navigate("/login");
      //TODO: add route here
    }
    //eslint-disable-next-line
  }, [authLoader]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      registerUser({ name: credentials.name, email: credentials.email, password: credentials.password, role: userType, image: credentials.image })
    );
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
};

const handleImageUpload = (e) => {
    setCredentials({ ...credentials, image: e.target.files[0] });
  }

  return (
    <div className="container font-poppins">
      <div className="row">
        <div className="col-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
          <Card className="box-shadow">
            <Card.Header>
            <div className="row">
                  <div className="col-6"><button className="btn btn-lg w-100" onClick={() => setUserType("user")}>User</button></div>
                  <div className="col-6"><button className="btn btn-lg w-100" onClick={() => setUserType("organizer")}>Organizer</button></div>
                </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                
              </Card.Title>
              <div className="mt-3 mb-3 d-flex justify-content-center">
                <div className="login_signup_header">Create an Account</div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-5 mt-5 row">
                <div className="col-12 offset-md-2 col-md-8"><FloatingLabel
                    controlId="floatingInput"
                    label="Name" htmlFor="name"
                    className="mb-3">
                      <Form.Control controlid="name" name="name" type="text" placeholder="Name" value={credentials.name}
                        required onChange={handleChange} />
                    </FloatingLabel>
                  </div>
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
                  { userType === "organizer" &&
                        <div className="col-12 offset-md-2 col-md-8">
                          <div className="row">
                            <div className="col-3"><label htmlFor="image">Image</label></div>
                            <div className="col-8"><input type="file" onChange={(e) => {handleChange(e); handleImageUpload(e)}} /></div>
                          </div>
                          {credentials.image ?
                            <div className="col-12 mt-3 mb-3"><img src={credentials.image && URL.createObjectURL(credentials.image)} height="180" width="180" alt="verifyImage" /></div>:<></>
                          }
                        </div>
                  }
                  <div className="col-12 offset-md-2 col-md-8 mt-5">
                    <button
                      className="navy-btn w-100 justify-center rounded-md border border-transparent py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 font-semibold text-lg disabled:bg-purple-300 "
                      disabled={authLoader==="loading"}
                      >
                      {authLoader==="loading" ? "Creating Account..." : "Create Account"}
                    </button>
                  </div>
                </div>
              </form>
              <div className="d-flex flex-row-reverse mb-3">
                <div><Link to="/login">Already have an account?</Link></div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Register;
