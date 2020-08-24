import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import Sidebar from './sidebar'

export default function Deals() {

  const { path, url} = useRouteMatch();

  return (
    <Row>
      <Col lg="2">
        <Sidebar basePath={path} />
      </Col>
      <Col>
      <Switch>
        <Route exact path={path}>
          Deals default
        </Route>
        <Route path={`${path}/list`}>
          Deal List
        </Route>
        <Route path={`${path}/create`}>
          Create Deal
        </Route>
        <Route path={`${path}/edit/:id`}>
          Edit Deal
        </Route>
      </Switch>
      </Col>
    </Row>
  )
}