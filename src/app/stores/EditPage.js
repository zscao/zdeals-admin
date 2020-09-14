import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import _ from 'lodash'

import { Page } from '../layout'
import StoreFrom from './StoreForm'

import * as storeActions from '../../state/ducks/stores/actions'


class EditPage extends React.Component {
  state = {
    store: null
  };

  componentDidMount() {
    const { match } = this.props;
    const id = _.get(match, 'params.id');

    if(id) {
      this.props.getStoreById(id).then(response => {
        this.setState({ store: response })
      })
    }
  }

  componentDidUpdate(prevProps) {
    
    const prevMatch = prevProps.match;
    const currMatch = this.props.match;

    const prevMatchId = _.get(prevMatch, 'params.id');
    const currMatchId = _.get(currMatch, 'params.id');

    if(currMatchId && prevMatchId !== currMatchId) {
      this.props.getStoreById(currMatchId).then(response => {
        this.setState({ store: response })
      })
    }
  }

  submitForm = values => {
    const store = this.state.store;
    if(!store) return;

    this.props.updateStore(store.id, values).then(response => {
      //console.log('submitted: ', response);
    })
  }

  render() {
    return (
      <Page title="Edit Store">
        <Card>
          <Card.Body>
            <StoreFrom initValues={this.state.store} onSubmit={this.submitForm} />
          </Card.Body>
        </Card>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  stores: state.stores
})

const mapDispatchToProps = {
  ...storeActions
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPage));