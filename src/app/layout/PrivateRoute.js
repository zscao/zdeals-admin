import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getToken } from '../../state/session/storage'

const PrivateRoute = ({ component: Component, ...rest}) => {
  const token = getToken();
  const loggedin = !!token;
  return (
    <Route {...rest} render={props => (
      loggedin
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: { from: props.location }}} />
    )} />
  )
}


export default PrivateRoute