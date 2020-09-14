import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { createHistoryJumper } from '../helpers/routeHelper';

import { Page } from '../layout';
import StoreForm from './StoreForm';

import * as storeActions from '../../state/ducks/stores/actions';


class CreatePage extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  submitForm = values => {
    //console.log('submitting: ', values);
    this.props.createStore(values).then(store => {
      if(store && store.id) {
        const { basePath } = this.props;
        const next=`${basePath}/edit/${store.id}`;
        this.jumper.jumpTo(next);
      }
    })
  }

  render() {

    return (
      <Page title="Create Store">
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