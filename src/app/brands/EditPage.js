import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'

import _ from 'lodash'

import { Page } from '../layout'
import BrandFrom from './BrandForm'

import * as brandActions from '../../state/ducks/brands/actions'


class EditPage extends React.Component {
  state = {
    brand: null
  };

  componentDidMount() {
    const { match } = this.props;
    const id = _.get(match, 'params.id');

    if(id) {
      this.props.getBrandById(id).then(response => {
        this.setState({ brand: response })
      })
    }
  }

  componentDidUpdate(prevProps) {
    
    const prevMatch = prevProps.match;
    const currMatch = this.props.match;

    const prevMatchId = _.get(prevMatch, 'params.id');
    const currMatchId = _.get(currMatch, 'params.id');

    if(currMatchId && prevMatchId !== currMatchId) {

      this.props.getBrandById(currMatchId).then(response => {
        this.setState({ brand: response })
      })
    }
  }

  submitForm = values => {
    const brand = this.state.brand;
    if(!brand) return;
    this.props.updateBrand(brand.id, values).then(response => {
      //console.log('submitted: ', response);
    })
  }

  render() {
    return (
      <Page title="Edit Brand">
        <Card>
          <Card.Body>
            <BrandFrom initValues={this.state.brand} onSubmit={this.submitForm} mode='edit' />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);