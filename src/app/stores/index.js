import React from 'react'
import { Switch, Route, useRouteMatch, withRouter } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import Sidebar from './sidebar'
import EditPage from './EditPage'
import CreatePage from './CreatePage'

function Stores() {

  const { path } = useRouteMatch();

  return (
    <Row>
      <Col lg="3" className="side-container">
        <Sidebar basePath={path} />
      </Col>
      <Col>
        <Switch>
          <Route exact path={path}>
            <CreatePage basePath={path} />
          </Route>
          <Route path={`${path}/edit/:id`}>
            <EditPage />
          </Route>
          <Route path={`${path}/create`}>
            <CreatePage basePath={path} />
          </Route>
        </Switch>
      </Col>
    </Row>
  )
}

export default withRouter(Stores)