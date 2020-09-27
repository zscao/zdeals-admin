import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'

import { Page } from '../../layout'
import ChangePasswordForm from './ChangePasswordForm'

import * as accountActions from '../../../state/ducks/account/actions'

function ChangePasswordPage({account, changePassword}) {

  const submit = values => {
    const data = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    };

    return changePassword(data);
  }

  return (
    <Page title="Change my Password">
      <Card>
        <Card.Body>
          <ChangePasswordForm onSubmit={submit} />
        </Card.Body>
      </Card>
    </Page>
  )
}

const mapStateToProps = state => ({
  account: state.account
})

const mapDispatchToProps = {
  changePassword: accountActions.changePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage)