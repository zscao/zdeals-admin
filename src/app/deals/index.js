import React from 'react'
import { Switch, Route, useRouteMatch, withRouter } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import './index.scss'

import Sidebar from './sidebar'
import CreateDeal from './create'
import EditDeal from './edit'

function Deals() {

  const { path } = useRouteMatch();

  return (
    <Row>
      <Col lg="2" className="side-container">
        <Sidebar basePath={path} />
      </Col>
      <Col className="main-container">
        <Switch>
          <Route exact path={path}>
            Deals default
          </Route>
          <Route path={`${path}/list`}>
            Deal List
          </Route>
          <Route path={`${path}/create`}>
            <CreateDeal />
          </Route>
          <Route path={`${path}/edit/:id`}>
            <EditDeal />
          </Route>
        </Switch>
      </Col>
    </Row>
  )
}

export default withRouter(Deals)