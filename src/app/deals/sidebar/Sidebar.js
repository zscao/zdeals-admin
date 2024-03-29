import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Alert } from 'react-bootstrap'

import { TreeView } from '../../shared'
import { mapCategoryToTreeNode, createHistoryJumper } from '../../helpers'


import * as dealActions from '../../../state/ducks/deals/actions'
import * as categoryActions from '../../../state/ducks/categories/actions'

class Sidebar extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  state = {
    nodes: [],
    loading: false,
  }

  componentDidMount() {
    if(this.props.categories) {
      const nodes = mapCategoryToTreeNode([this.props.categories]);
      this.setState({nodes});
    }
    else {
      this.setState({loading: true});
      this.props.getCategoryTree()
      .finally(() => this.setState({loading: false}));
    }
  }

  componentDidUpdate(prevProps) {
    const prevCategories = prevProps.categories;
    const currCategories = this.props.categories;
    if(!prevCategories && currCategories) {
      const nodes = mapCategoryToTreeNode([currCategories]);
      this.setState({nodes});
    }

  }

  onSelectTreeItem = item => {

    return this.props.searchDeals({
      category: item.code,
    })
    .then(() => {
      const { basePath } = this.props;
      //console.log('tree item selected: ', item);
      const next = `${basePath}/list`;
      this.jumper.jumpTo(next);
    })
  }

  render() {

    const { basePath } = this.props;

    return (
      <>
        <Row className="mb-3">
          <Col>
            <Button as={Link} to={`${basePath}/create`} variant="success" block>New Deal +</Button>
          </Col>
        </Row>

        {this.state.loading  && <Alert variant="info">Loading Categories ...</Alert>}

        <TreeView data={this.state.nodes} expandLevel={1} onSelectItem={this.onSelectTreeItem} selectRow showIcon />

      </>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.tree.result
});

const mapDispatchToProps = {
  ...dealActions,
  ...categoryActions
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)