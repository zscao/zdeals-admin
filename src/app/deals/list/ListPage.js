import React from 'react';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';


import { Pagination } from '../../shared';
import { Page } from '../../layout'
import DealListView from './ListView';

import * as dealActions from '../../../state/ducks/deals/actions';
import * as storeActions from '../../../state/ducks/stores/actions';

import { createHistoryJumper } from '../../helpers/routeHelper';

import DealsFilter from './Filter';

const buttons = [
  { name: 'createDeal', title: 'Create Deal' }
]

class DealList extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  componentDidMount() {
    const dealData = _.get(this.props.deals, 'result.data');
    if(!dealData) this.searchDeals({
      deleted: false
    });

    const storeData = _.get(this.props.stores, 'data');
    if(!storeData) this.props.searchStores();
  }

  editDeal = deal => {
    this.jumper.jumpTo('/deals/edit/' + deal.id)
  }

  deleteDeal = deal => {
    if (!deal || !deal.id) return;

    this.props.deleteDeal(deal.id);
  }

  filterDeals = values => {
    let query = this.props.deals.query;
    query = {
      ...query,
      ...values,
      pageNumber: 1
    }
    query = _.omitBy(query, v => (v === '' || v === null || v === undefined));
    //console.log('filter: ', query);
    this.searchDeals(query);
  }

  onButtonClick = button => {
    if (button.name === 'createDeal')
      this.jumper.jumpTo('/deals/create');
  }

  gotoPage = page => {
    let query = this.props.deals.query;
    query = {
      ...query,
      pageNumber: page
    };
    this.searchDeals(query);
  }

  searchDeals = query => {
    return this.props.searchDeals(query);
  }

  render() {

    const storeData = _.get(this.props.stores, 'data') || [];
    const searchResult = this.props.deals.result || {};
    const query = this.props.deals.query || {}; 

    return (
      <Page title="Deals List" buttons={buttons} onButtonClick={this.onButtonClick}>
        <Card className="mb-3">
          <Card.Body>
            <DealsFilter onSubmit={this.filterDeals} stores={storeData} initValues={query} />
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <DealListView deals={searchResult} onEditDeal={this.editDeal} onDeleteDeal={this.deleteDeal} />
            <Pagination className="mt-2" {...searchResult} onGotoPage={this.gotoPage} />
          </Card.Body>
        </Card>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  deals: state.deals.search,
  stores: state.stores.search.result,
});

const mapDispatchToProps = {
  ...dealActions,
  searchStores: storeActions.searchStores,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DealList));