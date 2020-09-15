import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab, Card, Badge } from 'react-bootstrap'

import Page from '../../layout/Page'
import { createHistoryJumper } from '../../helpers/routeHelper'

import * as dealActions from '../../../state/ducks/deals/actions'
import * as brandActions from '../../../state/ducks/brands/actions'

import EditForm from './EditForm'
import DealPictures from './pictures'
import DealCategories from './categories'
import { LoadingBar, Constants } from '../../shared'

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
  },
  recycle: {
    name: 'recycle',
    title: 'Recycle',
    variant: 'warning',
    confirm: {
      title: 'Confirmation',
      body: 'Confirm to recycle the deleted deal.'
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
    loading: null,
  };

  componentDidMount() {

    const { match, brands } = this.props;
    const id = match.params.id;

    if (id) {
      this.setState({loading: 'get'});
      this.props.getDealById(id).then(response => {
        this.setState({ deal: response, loading: null })
      })
      .catch(() =>{
        this.setState({loading: null})
      })
    }

    if(!brands || !Array.isArray(brands.data))
      this.props.searchBrands();
  }

  submitDealForm = (values) => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return Promise.resolve();

    this.setState({loading: 'update'})
    return this.props.updateDeal(deal.id, values)
    .then(response => {
      this.setState({
        deal: response,
        loading: null,
      })
    })
  }

  verifyDeal = () => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.setState({loading: buttons.verify.name});
    this.props.verifyDeal(deal.id)
    .then(() => {
      this.setState({loading: null});
      this.goBack();
    })
    .catch(() => {
      this.setState({loading: null});
    })
  }

  deleteDeal = () => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.setState({loading: buttons.delete.name});
    this.props.deleteDeal(deal.id).then(() => {
      this.setState({loading: null});
      this.goBack();
    })
    .catch(() => {
      this.setState({loading: null});
    });
  }

  recycleDeal = () => {
    const deal = this.state.deal;
    if(!deal || !deal.id) return;

    this.setState({loading: buttons.recycle.name})
    this.props.recycleDeal(deal.id).then(response => {
      this.setState({deal: response, loading: null})
    });
  }

  getDealPictures = () => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.setState({loading: 'get-pictures'})
    this.props.getDealPictures(deal.id)
    .then(response => {
      this.setState({
        dealPictures: response && Array.isArray(response.data) ? response.data : [],
        loading: null,
      })
    })
    .catch(() => {
      this.setState({loading: null})
    })
  }

  getDealCategories = () => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.setState({loading: 'get-categories'});
    this.props.getDealCategories(deal.id)
    .then(response => {
      this.setState({
        dealCategories: response && Array.isArray(response.data) ? response.data : [],
        loading: null,
      })
    })
    .catch(() => {
      this.setState({loading: null});
    })
  }

  submitPictureForm = values => {
    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    this.setState({loading: 'save-pictures'})
    return this.props.saveDealPicture(deal.id, values)
    .then(() => {
      this.getDealPictures();
      this.setState({loading: null})
    })
    .catch(() => {
      this.setState({loading: null})
    })
  }

  submitCategoryForm = values => {
    //console.log('categories: ', values);

    const deal = this.state.deal;
    if (!deal || !deal.id) return;

    const data = {
      categories: values.map(x => x.id)
    }

    this.setState({loading: 'save-categories'})
    return this.props.saveDealCategories(deal.id, data)
    .then(response => {
      if (Array.isArray(response.data))
        this.setState({ 
          dealCategories: response.data,
          loading: null,
       })
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
      this.getDealCategories();
    }

  }

  goBack = () => {
    const list = '/deals/list';
    this.jumper.jumpTo(list);
  }

  getButtons = () => {
    const result = [{
      ...buttons.backToList,
      onClick: this.goBack
    }];

    if (this.state.deal) {
      const deal = this.state.deal;
      if(deal.status === Constants.DealStatus.Deleted) {
        result.push({
          ...buttons.recycle,
          onClick: this.recycleDeal
        })
      }
      else {
          result.push({
          ...buttons.delete,
          onClick: this.deleteDeal
        });

        if (deal.status !== Constants.DealStatus.Verified) result.push({
          ...buttons.verify,
          onClick: this.verifyDeal
        });
      }
    }
    return result;
  }

  render() {

    const btns = this.getButtons();

    const brandResult = this.props.brands;
    const brands = brandResult && Array.isArray(brandResult.data) ? brandResult.data : [];

    const { category } = this.props;
    const { deal, loading, tabKey, dealPictures, dealCategories } = this.state;

    const titleBadge = deal ? (<Badge pill variant="secondary">{deal.status}</Badge>) : null;

    return (
      <Page title="Edit Deal" buttons={btns} loading={loading} titleBadge={titleBadge} >
        <LoadingBar loading={loading} />
        <Tabs activeKey={tabKey} onSelect={this.selectTab}>
          <Tab eventKey="details" title="Details">
            <Card className="tab-content">
              <Card.Body>
                <EditForm initValues={deal} onSubmit={this.submitDealForm} brands={brands} />
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="pictures" title="Pictures">
            <DealPictures pictures={dealPictures} onPictureFormSubmit={this.submitPictureForm} />
          </Tab>
          <Tab eventKey="categories" title="Categories">
            <Card className="tab-content">
              <Card.Body>
                <DealCategories category={category} dealCategories={dealCategories} onSubmit={this.submitCategoryForm} />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditDeal));
