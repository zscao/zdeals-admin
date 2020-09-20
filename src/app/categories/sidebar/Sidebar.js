import React from 'react'
import { connect } from 'react-redux'
import { Link, matchPath } from 'react-router-dom'
import { Row, Col, Button, Alert } from 'react-bootstrap'

import { TreeView } from '../../shared'
import { mapCategoryToTreeNode, createHistoryJumper, findCategoryNodeById } from '../../helpers'

import * as categoryActions from '../../../state/ducks/categories/actions'

class Sidebar extends React.Component {
  
  jumper = createHistoryJumper(this.props.history);

  state = {
    nodes: [],
    activeItem: null,
    loading: false
  }

  componentDidMount() {
    if(this.props.categories) {
      const nodes = mapCategoryToTreeNode([this.props.categories]);
      let activeItem = null;
      if(Array.isArray(nodes)) {
        const editingId = this.getEditingId(this.props.location);
        if(editingId) activeItem = findCategoryNodeById(nodes, editingId);
      }

      this.setState({
        nodes,
        activeItem,
      })
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
    
    if(currCategories && prevCategories !== currCategories) {
      
      const nodes = mapCategoryToTreeNode([currCategories]);

      let activeItem = null;
      if(Array.isArray(nodes)) {
        const editingId = this.getEditingId(this.props.location);
        if(editingId) activeItem = findCategoryNodeById(nodes, editingId);
      }

      this.setState({
        nodes,
        activeItem
      });
    }
    else if(Array.isArray(this.state.nodes)) {
      // update active item
      const prevEditingId = this.getEditingId(prevProps.location);
      const currEditingId = this.getEditingId(this.props.location);

      if(currEditingId && prevEditingId !== currEditingId) {
        const activeItem = findCategoryNodeById(this.state.nodes, currEditingId);
        this.setState({activeItem});
      }
    }
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



  onSelectTreeItem = item => {

    if(!item || !item.id) return;

    const { basePath } = this.props;
    const next = `${basePath}/edit/${item.id}`
    this.jumper.jumpTo(next);
  }

  render() {

    const { basePath } = this.props;

    return (
      <>
        <Row className="mb-3">
          <Col>
            <Button as={Link} to={{pathname: `${basePath}/create`, state: {parent: this.state.activeItem}}} variant="success" block>New Category +</Button>
          </Col>
        </Row>

        {this.state.loading && <Alert variant="info">Loading Categories ...</Alert>}

        <TreeView data={this.state.nodes} expandLevel={1} onSelectItem={this.onSelectTreeItem} activeItem={this.state.activeItem} selectRow showIcon />
      </>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.tree.result
})

const mapDispatchToProps = {
  ...categoryActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)