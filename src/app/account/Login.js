import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { createHistoryJumper } from '../helpers'
import LoginForm from './LoginForm'

import * as userActions from '../../state/ducks/users/actions'

class Login extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  login = values => {
    //console.log('login: ', values);

    this.props.login(values).then(response => {
      //console.log('logged in: ', response);
      this.jumper.jumpTo('/dashboard')
    })
  }

  render() {
    return (
      <Row className="mt-4 justify-content-md-center">
        <Col lg={4} md={8}>
          <Row className="mb-4">
            <Col>
              <img height="32" src="/logo.png" alt="Fat Deals" />
            </Col>
          </Row>
          <LoginForm onSubmit={this.login} />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = {
  ...userActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)