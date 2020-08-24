import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

import TreeView from '../../shared/treeview'
import { mapCategoryToTreeNode } from '../../helpers'


import * as categoryActions from '../../../state/ducks/categories/actions'

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nodes: []
    }
  }

  componentDidMount() {
    if(this.props.categories) {
      const nodes = mapCategoryToTreeNode([this.props.categories]);
      this.setState({nodes});
    }
    else {
      this.props.getCategoryTree();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevCategories = prevProps.categories;
    const currCategories = this.props.categories;
    if(!prevCategories && currCategories) {
      const nodes = mapCategoryToTreeNode([currCategories]);
      this.setState({nodes});
    }

  }

  render() {

    const { basePath } = this.props;

    return (
      <>
        <Row>
          <Col>
            <Button as={Link} to={`${basePath}/create`}>Create</Button>
          </Col>
        </Row>

        <TreeView data={this.state.nodes} expandLevel={1} />

      </>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.tree.result
});

const mapDispatchToProps = {
  ...categoryActions
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)