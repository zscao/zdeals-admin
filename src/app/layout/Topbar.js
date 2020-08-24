import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'



export default function Topbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/dashboard">
        <img
          alt=""
          src="/logo.png"
          height="32"
          className="d-inline-block align-top"
        />{' '}
        Admin Portal
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/deals">Deals</Nav.Link>
        <Nav.Link as={Link} to="/stores">Stores</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/account">Account</Nav.Link>
      </Nav>
    </Navbar>
  )
}