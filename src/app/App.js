import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './layout/PrivateRoute'

import './App.scss'

import { Topbar } from './layout'
import Dashboard from './dashboard'
import Deals from './deals'
import Stores from './stores'
import Brands from './brands'
import Categories from './categories'
import Account from './account'
import Login from './account/Login'

const PortalLayout = ({ children }) => {
  return (
    <Container className="main-viewport" fluid>
      <Topbar />
      <div className="main-container">
        {children}
      </div>
    </Container>
  )
}

const FullPageLayout = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const FullPageLogin = props => (<FullPageLayout><Login {...props} /></FullPageLayout>);
const PortalDashboard = props => (<PortalLayout><Dashboard {...props} /></PortalLayout>);
const PortalDeals = props => (<PortalLayout><Deals {...props} /></PortalLayout>);
const PortalStores = props => (<PortalLayout><Stores {...props} /></PortalLayout>);
const PortalBrands = props => (<PortalLayout><Brands {...props} /></PortalLayout>);
const PortalCategories = props => (<PortalLayout><Categories {...props} /></PortalLayout>);
const PortalAccount = props => (<PortalLayout><Account {...props} /></PortalLayout>);


const App = ({ baseUrl }) => {
  return (
    <BrowserRouter basename={baseUrl}>      
      <Switch>
        <Route exact path="/" component={FullPageLogin} />
        <PrivateRoute path="/dashboard" component={PortalDashboard} />
        <PrivateRoute path="/deals" component={PortalDeals} />
        <PrivateRoute path="/stores" component={PortalStores} />
        <PrivateRoute path="/brands" component={PortalBrands} />
        <PrivateRoute path="/categories" component={PortalCategories} />
        <PrivateRoute path="/account" component={PortalAccount} />

        <Route path="/login" component={FullPageLogin} />
        <Redirect to="/dashboard" />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
