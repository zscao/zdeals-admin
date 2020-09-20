import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'

import _ from 'lodash'

import { Page } from '../layout'
import CategoryForm from './CategoryForm'

import * as categoryActions from '../../state/ducks/categories/actions'

class EditPage extends React.Component {
  state = {
    category: null
  }

  componentDidMount() {
    if(!this.props.categoryList) this.props.getCategoryList();

    const { match } = this.props;
    const id = _.get(match, 'params.id');
    if(id) {
      this.props.getCategoryById(id).then(category => {
        this.setState({ category })
      })
    }
  }

  componentDidUpdate(prevProps) {
    const prevMatch = prevProps.match;
    const currMatch = this.props.match;

    const prevMatchId = _.get(prevMatch, 'params.id');
    const currMatchId = _.get(currMatch, 'params.id');

    if(currMatchId && prevMatchId !== currMatchId) {
      this.props.getCategoryById(currMatchId).then(category => {
        this.setState({ category })
      })
    }
  }

  
  submitForm = values => {
    const category = this.state.category;
    if(!category) return;
    this.props.updateCategory(category.id, values).then(response => {
      //console.log('submitted: ', response);
      this.props.getCategoryTree();
    })
  }

  render() {
    const { categoryList } = this.props;
    const categories = categoryList && Array.isArray(categoryList.data) ? categoryList.data : [];

    return (
      <Page title="Edit Category">
        <Card>
          <Card.Body>
            <CategoryForm initValues={this.state.category} categories={categories} onSubmit={this.submitForm} mode="edit" />
          </Card.Body>
        </Card>
      </Page>
    )
  }

}

const mapStateToProps = state => ({
  categoryList: state.categories.list.result
})

const mapDispatchToProps = {
  ...categoryActions
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage)