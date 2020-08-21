import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './layout/PrivateRoute'

import './App.scss'

import { Topbar } from './layout'
import Dashboard from './dashboard'
import Deals from './deals'
import Stores from './stores'
import Account from './account'
import Login from './account/Login'

const PortalLayout = ({ children }) => {
  return (
    <>
      <Topbar />
      <div className="mt-1">
        {children}
      </div>
    </>
  )
}

const FullPageLayout = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const FullPageLogin = () => (<FullPageLayout><Login /></FullPageLayout>);
const PortalDashboard = () => (<PortalLayout><Dashboard /></PortalLayout>);
const PortalDeals = () => (<PortalLayout><Deals /></PortalLayout>);
const PortalStores = () => (<PortalLayout><Stores /></PortalLayout>);
const PortalAccount = () => (<PortalLayout><Account /></PortalLayout>);


class App extends React.Component {
  
  render() {
    return (
      <Container fluid>
          <Switch>
            <Route exact path="/" component={FullPageLogin}/>
            <PrivateRoute path="/dashboard" component={PortalDashboard} />
            <PrivateRoute path="/deals" component={PortalDeals} />
            <PrivateRoute path="/stores" component={PortalStores} />
            <PrivateRoute path="/account" component={PortalAccount} />

            <Route path="/login" component={FullPageLogin} />
            <Redirect to="/dashboard" />
          </Switch>
      </Container>
    );
  }
}

export default App;
