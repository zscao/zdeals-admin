import React from 'react'
import { Switch, Route, useRouteMatch, withRouter } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import ListPage from './ListPage'
import EditPage from './EditPage'
import CreatePage from './CreatePage'

function Stores() {

  const { path } = useRouteMatch();

  return (
    <Row>
      <Col>
        <Switch>
          <Route exact path={path}>
            <ListPage />
          </Route>
          <Route path={`${path}/list`}>
            <ListPage />
          </Route>
          <Route path={`${path}/edit/:id`}>
            <EditPage />
          </Route>
          <Route path={`${path}/create`}>
            <CreatePage />
          </Route>
        </Switch>
      </Col>
    </Row>
  )
}

export default withRouter(Stores)