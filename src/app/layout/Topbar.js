import React from 'react'
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
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/deals">Deals</Nav.Link>
        <Nav.Link href="/stores">Stores</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/account">Account</Nav.Link>
      </Nav>
    </Navbar>
  )
}