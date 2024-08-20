import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";

import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logoo.svg";
import "../styles/components/navigation.css";

const Navigation: React.FC = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="myNavbar">
      <Navbar.Brand as={Link} to="/home">
        <img src={logo} alt="" className="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {isAuth ? (
            <>
              <button className="myNavButton">
                <Nav.Link as={Link} to="/home" className="text-white">
                  Home
                </Nav.Link>
              </button>
              <button className="myNavButton">
                <Nav.Link as={Link} to="/profile" className="text-white">
                  Profile
                </Nav.Link>
              </button>
            </>
          ) : (
            <>
              <button className="myNavButton">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </button>
              <button className="myNavButton">
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
