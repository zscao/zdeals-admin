import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'

import { Page } from '../layout'
import StoreFrom from './StoreForm'

import * as storeActions from '../../state/ducks/stores/actions'

import { createHistoryJumper } from '../helpers/routeHelper'

const buttons = [
  { name: 'backToList', title: 'Back to List', }
]

class EditPage extends React.Component {
  state = {
    store: null
  };

  jumper = createHistoryJumper(this.props.history);

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.id;

    if(id) {
      this.props.getStoreById(id).then(response => {
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

  onButtonClick = button => {
    if(button.name === 'backToList') this.jumper.jumpTo('/stores/list');
  }

  render() {
    return (
      <Page title="Edit Store" buttons={buttons} onButtonClick={this.onButtonClick}>
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