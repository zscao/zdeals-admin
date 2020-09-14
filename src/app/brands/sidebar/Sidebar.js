import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Row, Col, Button, Alert } from 'react-bootstrap'

import './Sidebar.scss'

import BrandList from './BrandList'

import * as brandActions from '../../../state/ducks/brands/actions'
import { createHistoryJumper } from '../../helpers'

class Sidebar extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  state = {
    activeBrand: null,
    loading: true,
  }

  componentDidMount() {
    this.props.searchBrands()
    .then(response => {
      this.setState({loading: false});

      const brandId = this.getEditingId();
      if(brandId && Array.isArray(response.data)) {
        const brand = response.data.find(x => x.id == brandId);
        if(brand) this.setState({activeBrand: brand});
      }
    })
    .catch(() => this.setState({loading: false}))
  }

  componentDidUpdate(prevProps) {
    const prevLocation = prevProps.location;
    const currLocation = this.props.location;
 
    if(currLocation.pathname !== prevLocation.pathname) {
     
     const brandId = this.getEditingId();
     if(!brandId) {
       this.setState({activeBrand: null});
       return;
     };
 
     const { searchResult } = this.props;
     const brands = searchResult && Array.isArray(searchResult.data) ? searchResult.data : [];
     const brand = brands.find(x => x.id === brandId);
 
     if(brand) this.setState({activeBrand: brand})
    }
  }

  selectBrand = brand => {
    if(!brand || !brand.id) return;

    const { basePath } = this.props;
    const next = `${basePath}/edit/${brand.id}`;
    this.jumper.jumpTo(next);
  }

  getEditingId = () => {
    const { basePath, location } = this.props;
    const editingPattern = `${basePath}/edit/(\\d+)`;
    const regex = new RegExp(editingPattern);
    const result = regex.exec(location.pathname);

    return Array.isArray(result) && result.length > 1 ? parseInt(result[1]) : undefined;
  }

  render() {

    const {basePath, searchResult } = this.props;
    const brands = searchResult && Array.isArray(searchResult.data) ? searchResult.data : [];

    return (
      <>
        <Row className="mb-3">
          <Col>
            <Button as={Link} to={`${basePath}/create`} variant="success" block>New Brand +</Button>
          </Col>
        </Row>
        {this.state.loading && <Alert variant="info">Loading stores...</Alert>}
        <BrandList brands={brands} activeBrand={this.state.activeBrand } onClickItem={this.selectBrand} />

      </>
    )
  }
}


const mapStateToProps = state => ({
  searchResult: state.brands.search.result
})

const mapDispatchToProps = {
  ...brandActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar))