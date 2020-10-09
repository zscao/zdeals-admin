import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

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
        <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
        <Nav.Link as={Link} to="/brands">Brands</Nav.Link>
        <Nav.Link as={Link} to="/stores">Stores</Nav.Link>
      </Nav>
      <Nav>
        <NavDropdown title={<><FontAwesomeIcon icon={faUser} className="mr-2" />{user.nickname}</>}>
          <NavDropdown.Item href="/account">
            <FontAwesomeIcon icon={faUserCircle} className="mr-2" />Account
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}