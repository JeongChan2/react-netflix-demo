import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from "react-router-dom";
import "./AppLayout.style.css"

const AppLayout = () => {
  return (
    <div className="navbar-container">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="navbar-container">
          <Navbar.Brand href="/" className="logo-brand"><img alt="" src="https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/movies">Movies</Nav.Link>

            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger" className="search-button">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  );
};

export default AppLayout;
