import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    const home = window.location.href.split("?")[0];
    return (
      <Navbar id="navbar" fixedTop={true} fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={home}>Lista de Cursos</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default NavBar;
