import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab, Card } from 'react-bootstrap'

import Page from '../../layout/Page'
import { createHistoryJumper } from '../../helpers/routeHelper';

import * as dealActions from '../../../state/ducks/deals/actions';
import * as brandActions from '../../../state/ducks/brands/actions';

import EditForm from './EditForm';
import DealPictures from './pictures';

const buttons = {
  backToList: {
    name: 'backToList',
    title: 'Back to List'
  },
  verify: {
    name: 'verify',
    title: 'Verify',
    variant: 'success',
    confirm: {
      title: 'Confirmation',
      body: 'Confirm to verify the deal.'
    }
  },
  delete: {
    name: 'delete',
    title: 'Delete',
    variant: 'danger',
    confirm: {
      title: 'Confirmation',
      body: 'Are you sure to delete the deal?'
    }
  }
}

class EditDeal extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  state = {
    deal: null, // the current deal
    pictures: [], // the picture list of the current deal
    categories: [], // the category list of the current deal
    category: null, // the category tree in the app
    categoryList: [], // the category list in the app

    tabKey: 'details',
  };

  componentDidMount() {

    const { match } = this.props;
    const id = match.params.id;

    if (id) {
      this.props.getDealById(id).then(response => {
        this.setState({ deal: response })
      })
    }

    const brandResult = this.props.brands;
    if(!brandResult || !Array.isArray(brandResult.data))
      this.props.searchBrands();
  }

  submitDealForm = (values) => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.props.updateDeal(deal.id, values).then(response => {
      this.setState({
        deal: response
      })
    })
  }

  verifyDeal = () => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.props.verifyDeal(deal.id).then(response => {
      this.goBack();
    })
  }

  deleteDeal = () => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.props.deleteDeal(deal.id).then(response => {
      this.goBack();
    });
  }

  getDealPictures = () => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.props.getDealPictures(deal.id).then(response => {
      this.setState({
        pictures: response && Array.isArray(response.data) ? response.data : []
      })
    })
  }

  submitPictureForm = values => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.props.saveDealPicture(deal.id, values).then(response => {
      this.getDealPictures();
    })
  }

  selectTab = key => {

    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.setState({ tabKey: key });

    if (key === 'pictures' && !this.state.pictures.length) {
      this.getDealPictures();
    }

  }

  goBack = () => {
    const list = '/deals/list';
    this.jumper.jumpTo(list);
    // const path = this.props.location.pathname;
    // if (path) {
    //   const up = this.jumper.pathUp(path, 2);
    //   if (up) this.jumper.jumpTo(up);
    // }
  }

  getButtons = () => {
    const result = [{
      ...buttons.backToList,
      onClick: this.goBack
    }];

    if (this.state.deal) {
        result.push({
        ...buttons.delete,
        onClick: this.deleteDeal
      });

      if (!this.state.deal.verifiedTime) result.push({
        ...buttons.verify,
        onClick: this.verifyDeal
      });
    }
    return result;
  }

  render() {

    const btns = this.getButtons();

    const brandResult = this.props.brands;
    const brands = brandResult && Array.isArray(brandResult.data) ? brandResult.data : [];

    return (
      <Page title="Edit Deal" buttons={btns}>
        <Tabs activeKey={this.state.tabKey} onSelect={this.selectTab}>
          <Tab eventKey="details" title="Details">
            <Card className="tab-content">
              <Card.Body>
                <EditForm initValues={this.state.deal} onSubmit={this.submitDealForm} brands={brands} />
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="pictures" title="Pictures">
            <DealPictures pictures={this.state.pictures} onPictureFormSubmit={this.submitPictureForm} />
          </Tab>
        </Tabs>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  deals: state.deals.search,
  brands: state.brands.search.result,
})

const mapDispatchToProps = {
  ...dealActions,
  ...brandActions
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditDeal));