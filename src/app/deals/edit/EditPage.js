import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab, Card } from 'react-bootstrap'

import Page from '../../layout/Page'
import { createHistoryJumper } from '../../helpers/routeHelper';

import * as dealActions from '../../../state/ducks/deals/actions';
import * as brandActions from '../../../state/ducks/brands/actions';
// import * as categoryActions from '../../../state/ducks/categories/actions';

import EditForm from './EditForm';
import DealPictures from './pictures';
import DealCategories from './categories';

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
    dealPictures: [], // the picture list of the current deal
    dealCategories: [], // the category list of the current deal

    tabKey: 'details',
  };

  componentDidMount() {

    const { match, brand } = this.props;
    const id = match.params.id;

    if (id) {
      this.props.getDealById(id).then(response => {
        this.setState({ deal: response })
      })
    }

    if(!brand || !Array.isArray(brand.data))
      this.props.searchBrands();

    // if(!category)
    //   this.props.getCategoryTree();
  }

  submitDealForm = (values) => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return Promise.resolve();

    return this.props.updateDeal(deal.id, values)
    .then(response => {
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
        dealPictures: response && Array.isArray(response.data) ? response.data : []
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

  submitCategoryForm = values => {
    //console.log('categories: ', values);

    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    const data = {
      categories: values.map(x => x.id)
    }

    this.props.saveDealCategories(deal.id, data).then(response => {
      if (Array.isArray(response.data))
        this.setState({ dealCategories: response.data })
    })
  }

  selectTab = key => {

    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.setState({ tabKey: key });

    if (key === 'pictures' && !this.state.dealPictures.length) {
      this.getDealPictures();
    }
    else if(key === 'categories' && !this.state.dealCategories.length) {
      this.props.getDealCategories(deal.id).then(response => {
        this.setState({
          dealCategories: response && Array.isArray(response.data) ? response.data : []
        })
      })
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

    const category = this.props.category;

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
            <DealPictures pictures={this.state.dealPictures} onPictureFormSubmit={this.submitPictureForm} />
          </Tab>
          <Tab eventKey="categories" title="Categories">
            <Card className="tab-content">
              <Card.Body>
                <DealCategories category={category} dealCategories={this.state.dealCategories} onSubmit={this.submitCategoryForm} />
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  deals: state.deals.search,
  brands: state.brands.search.result,
  category: state.categories.tree.result,
})

const mapDispatchToProps = {
  ...dealActions,
  ...brandActions,
  // ...categoryActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditDeal));