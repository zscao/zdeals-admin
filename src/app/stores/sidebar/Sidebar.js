import React from 'react'
import { connect } from 'react-redux'
import { Link, matchPath } from 'react-router-dom'
import { Row, Col, Button, Alert } from 'react-bootstrap'

import './Sidebar.scss'

import { createHistoryJumper } from '../../helpers';
import StoreList from './StoreList'

import * as storeActions from '../../../state/ducks/stores/actions';

class Sidebar extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  state = {
    activeStore: null,
    loading: true,
  };

  componentDidMount() {
    this.props.searchStores()
    .then(response => {
      this.setState({loading: false});
      
      const storeId = this.getEditingId(this.props.location);
      if(storeId && Array.isArray(response.data)) {
        const store = response.data.find(x => x.id === storeId);
        if(store) this.setState({activeStore: store});
      }
    })
    .catch(() => this.setState({loading: false}))
  }

 componentDidUpdate(prevProps) {
   const prevLocation = prevProps.location;
   const currLocation = this.props.location;

   if(currLocation.pathname !== prevLocation.pathname) {
    
    const storeId = this.getEditingId(currLocation);
    if(!storeId) {
      this.setState({activeStore: null});
      return;
    };

    const { searchResult } = this.props;
    const stores = searchResult && Array.isArray(searchResult.data) ? searchResult.data : [];
    const store = stores.find(x => x.id === storeId);

    if(store) this.setState({activeStore: store})
   }
 }

  selectStore = store => {
    if(!store || !store.id) return;

    const { basePath } = this.props;
    const next = `${basePath}/edit/${store.id}`;
    this.jumper.jumpTo(next);
  }

  getEditingId = location => {
    if(!location) return undefined;

    const { basePath } = this.props;
    const match = matchPath(location.pathname, {
      path: `${basePath}/edit/:id`
    });
    
    //console.log('match: ', match);
    if(!match) return undefined;

    return match.params && match.params.id ? parseInt(match.params.id) : undefined;
  }

  render() {
    
    const {basePath, searchResult } = this.props;
    const stores = searchResult && Array.isArray(searchResult.data) ? searchResult.data : [];

    return (
      <>
        <Row className="mb-3">
          <Col>
            <Button as={Link} to={`${basePath}/create`} variant="success" block>New Store +</Button>
          </Col>
        </Row>
        {this.state.loading && <Alert variant="info">Loading stores...</Alert>}
        <StoreList stores={stores} activeStore={this.state.activeStore} onClickItem={this.selectStore} />
      </>
    )
  }
}

const mapStateToProps = state => ({
  searchResult: state.stores.search.result
})

const mapDispatchToProps = {
  ...storeActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
