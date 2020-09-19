import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import Sidebar from './sidebar'
import CreatePage from './CreatePage'

function Categories({ match, location, history }) {

  const { path } = match;

  return (
    <Row>
      <Col lg="3" className="side-container">
        <Sidebar basePath={path} location={location} history={history} />
      </Col>
      <Col className="content-container">
        <Switch>
          <Route path={`${path}/edit/:id`}>
            Edit Form
          </Route>
          <Route path={`${path}/create`} render={props => <CreatePage basePath={path} {...props} />} />
          <Route path={path} render={props => <CreatePage basePath={path} {...props} />} />
        </Switch>
      </Col>
    </Row>
  )
}

export default Categories