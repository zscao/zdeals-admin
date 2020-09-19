import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {Row, Col } from 'react-bootstrap'

import Sidebar from './sidebar'
import EditPage from './EditPage'
import CreatePage from './CreatePage'


function Brands({match, history, location}) {

  const {path} = match;

  return (
    <Row>
      <Col lg="3" className="side-container">
        <Sidebar basePath={path} history={history} location={location} />
      </Col>
      <Col>
        <Switch>
          <Route path={`${path}/edit/:id`} component={EditPage} />
          <Route path={`${path}/create`} render={props => <CreatePage basePath={path} {...props}/>} />
          <Route path={path} render={props => <CreatePage basePath={path} {...props}/>} />
        </Switch>
      </Col>
    </Row>
  )
}

export default Brands;