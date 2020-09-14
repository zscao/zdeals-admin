import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import { createHistoryJumper } from '../helpers'

import { Page } from '../layout'
import BrandForm from './BrandForm'

import * as brandActions from '../../state/ducks/brands/actions'

class CreatePage extends React.Component {
  jumper = createHistoryJumper(this.props.history);

  submitForm = values => {
    //console.log('create brand: ', values);

    this.props.createBrand(values).then(brand => {
      if(brand && brand.id) {
        const { basePath } = this.props;
        const next = `${basePath}/edit/${brand.id}`;
        this.jumper.jumpTo(next);
      }
    })

  }

  render() {
    return (
      <Page title="Create Brand">
        <Card>
          <Card.Body>
            <BrandForm onSubmit={this.submitForm} />
          </Card.Body>
        </Card>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  brands: state.brands
})

const mapDispatchToProps = {
  ...brandActions
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePage))