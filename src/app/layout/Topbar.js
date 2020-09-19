import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { getUser } from '../../state/session/storage'

export default function Topbar() {

  const user = getUser();

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/dashboard">
        <img
          alt=""
          src="/logo.png"
          height="32"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/deals">Deals</Nav.Link>
        <NavDropdown title="Settings">
          <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
          <NavDropdown.Item href="/brands">Brands</NavDropdown.Item>
          <NavDropdown.Item href="/stores">Stores</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/account">{user.nickname}</Nav.Link>
      </Nav>
    </Navbar>
  )
}