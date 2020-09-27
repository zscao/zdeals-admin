import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import Sidebar from './sidebar'
import ChangePasswordPage from './change-password'

export default function Account({match, history, location}) {

  const { path } = match;

  return (
    <Row>
      <Col lg="2" className="side-container">
        <Sidebar basePath={path} history={history} location={location} />
      </Col>
      <Col className="content-container">
        <Switch>
          <Route path={`${path}/profile`}>
            My Profile
          </Route>
          <Route path={`${path}/password`} component={ChangePasswordPage} />
          <Route path={`${path}`}>
            Account Home
          </Route>
        </Switch>
      </Col>
    </Row>
  )
}