import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

import TreeView from '../../shared/treeview'
import { mapCategoryToTreeNode, createHistoryJumper } from '../../helpers'


import * as dealActions from '../../../state/ducks/deals/actions'
import * as categoryActions from '../../../state/ducks/categories/actions'

class Sidebar extends React.Component {

  jumper = createHistoryJumper(this.props.history);

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

  componentDidUpdate(prevProps) {
    const prevCategories = prevProps.categories;
    const currCategories = this.props.categories;
    if(!prevCategories && currCategories) {
      const nodes = mapCategoryToTreeNode([currCategories]);
      this.setState({nodes});
    }

  }

  onSelectTreeItem = item => {

    this.props.searchDeals({
      category: item.code,
      deleted: false,
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

        <TreeView data={this.state.nodes} expandLevel={1} onSelectItem={this.onSelectTreeItem} />

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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar))