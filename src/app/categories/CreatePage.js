import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'

import _ from 'lodash'

import { createHistoryJumper } from '../helpers'

import { Page } from '../layout'
import CategoryForm from './CategoryForm'

import * as categoryActions from '../../state/ducks/categories/actions'

class CreatePage extends React.Component {
  jumper = createHistoryJumper(this.props.history);

  state = {
    category: undefined
  }

  componentDidMount() {
    
    const parent = _.get(this.props.location, 'state.parent');
    if(parent && parent.id) this.setState({
      category: {
       ...this.state.category, 
       parentId: parent.id
      }
    });

    if(!this.props.categoryList) this.props.getCategoryList();
  }

  submitForm = values => {
    //console.log('create category: ', values);

    this.props.createCategory(values)
    .then(category => {
      //return this.props.getCategoryTree().then(() => category);
      if(category && category.id) {
        this.props.getCategoryTree()
        .finally(() => {
          const { basePath } = this.props;
          const next = `${basePath}/edit/${category.id}`;
          this.jumper.jumpTo(next);
        })        
      }
    })
  }

  render() {

    const { categoryList } = this.props;
    const categories = categoryList && Array.isArray(categoryList.items) ? categoryList.items : [];

    return (
      <Page title="Create Category">
        <Card>
          <Card.Body>
            <CategoryForm initValues={this.state.category} onSubmit={this.submitForm} categories={categories} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage)