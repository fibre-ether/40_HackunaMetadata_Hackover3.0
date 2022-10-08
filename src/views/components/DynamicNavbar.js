import { useDispatch, useSelector } from "react-redux";
import Sidebar from './Sidebar'
import { setLoader } from "../../redux/actions/AuthActions";
import { useEffect } from "react";
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';

export default function Dynamicnavbar() {
  const { user }  = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoader("idle"));
  }, [dispatch]);

  return(
    <div className="navbar-bg mb-5 font-poppins">
      {token ?
        <Sidebar name={user?.name}/> :

        <Navbar collapseOnSelect expand="lg" className="pt-3 pb-3">
                    <Container>
            <Navbar.Brand href="/" className="login_signup_header text-white"><Link to="/">SITE NAME</Link></Navbar.Brand>
          
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ml-auto d-flex">
          <Nav.Item>
            <button className="d-none d-lg-block mr-5 text-white p-2"><Link className="nav_login_link" to="/login">Login</Link></button>
            <Link className="d-lg-none text-white nav_login_link" to="/login">Login</Link>
          </Nav.Item>
          <Nav.Item>
            <button className="d-none d-lg-block ml-5 nav_register_btn text-white p-2"><Link to="/register" className="nav_register_link">Register</Link></button>
            <Link className="d-lg-none text-white nav_login_link" to="/register">Register</Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
      }
    </div>
  );
}
