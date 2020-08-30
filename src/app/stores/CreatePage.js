import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

import { createHistoryJumper } from '../helpers/routeHelper';

import { Page } from '../layout';
import StoreForm from './StoreForm';

import * as storeActions from '../../state/ducks/stores/actions';


const buttons = [
  { name: 'backToList', title: 'Back to List'}
]

class CreatePage extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  submitForm = values => {
    //console.log('submitting: ', values);
    this.props.createStore(values).then(response => {
      //console.log(response);
    })
  }

  onButtonClick = button => {
    if(button.name === 'backToList') this.jumper.jumpTo('/stores')
  }

  render() {
    return (
      <Page title="Create Store" buttons={buttons} onButtonClick={this.onButtonClick}>
        <Card>
          <Card.Body>
          <StoreForm onSubmit={this.submitForm} />
          </Card.Body>
        </Card>
      </Page>
    )
  }
}

const mapStateToPros = state => ({
  stores: state.stores
})

const mapDispatchToProps = {
  ...storeActions
}
export default connect(mapStateToPros, mapDispatchToProps)(withRouter(CreatePage));