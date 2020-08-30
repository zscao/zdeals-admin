import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Page } from '../layout';
import { createHistoryJumper } from '../helpers/routeHelper';
import ListView from './ListView'

import * as storeActions from '../../state/ducks/stores/actions';

const buttons = [
  { name: 'createStore', title: 'Create Store'}
]

class ListPage extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  componentDidMount() {
    this.props.searchStores().then(response => {
      //console.log('stores: ', response);
    });
  }

  editStore = store => {
    console.log('edit store: ', store);
    this.jumper.jumpTo('/stores/edit/' + store.id)
  }

  onButtonClick = button => {
    if(button.name === 'createStore') this.jumper.jumpTo('/stores/create');
  }

  render() {
    const { stores } = this.props;
    const searchResult = stores.search.result || {};
    const data = searchResult.data || [];

    return (
      <Page title="Store List" buttons={buttons} onButtonClick={this.onButtonClick}>
        <Card>
          <Card.Body>
            <ListView stores={data} onEditStore={this.editStore} />
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
  ...storeActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListPage));
