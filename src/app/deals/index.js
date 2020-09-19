import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import './index.scss'

import Sidebar from './sidebar'
import CreateDeal from './create'
import EditDeal from './edit'
import ListDeal from './list'

function Deals({match, location, history}) {

  const { path } = match;

  return (
    <Row>
      <Col lg="2" className="side-container">
        <Sidebar basePath={path} location={location} history={history} />
      </Col>
      <Col className="content-container">
        <Switch>
          <Route path={`${path}/list`} component={ListDeal} />
          <Route path={`${path}/create`} component={CreateDeal} />
          <Route path={`${path}/edit/:id`} component={EditDeal} />
          <Route path={path} component={CreateDeal} />
        </Switch>
      </Col>
    </Row>
  )
}

export default Deals