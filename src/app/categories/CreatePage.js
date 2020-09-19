import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'

import { createHistoryJumper } from '../helpers'

import { Page } from '../layout'
import CategoryForm from './CategoryForm'

import * as categoryActions from '../../state/ducks/categories/actions'

class CreatePage extends React.Component {
  jumper = createHistoryJumper(this.props.history);

  submitForm = values => {
    console.log('create category: ', values);
  }

  render() {
    return (
      <Page title="Create Category">
        <Card>
          <Card.Body>
            <CategoryForm onSubmit={this.submitForm} />
          </Card.Body>
        </Card>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = {
  ...categoryActions
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage)