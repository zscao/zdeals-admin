import React from 'react'
import { ListGroup, Collapse } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown, faMinus, faFolder, faFolderOpen, faFile } from '@fortawesome/free-solid-svg-icons'

import './treeview.scss'

import DataModel from './DataModel'

export class TreeView extends React.Component {
  
  constructor(props) {
    super(props);
    this.model = new DataModel(props.data, props.expandLevel);

    this.state = {
      refresh: false
    }
  }

  componentDidMount() {
    
    this.model.addEventListener('selectItem', item => {
      console.log('item selected in model1: ', item);
      this.setState({
        refresh: !this.state.refresh
      })
    })
    this.model.addEventListener('toggleOpen', item => {
      console.log('open status changed: ', item);
      this.setState({
        refresh: !this.state.refresh
      })
    })
  }

  selectItem = key => {
    this.model.selectItem(key)
  }

  toggleOpenStatus = key => {
    console.log('need to toggle ', key);
    this.model.toggleOpenStatus(key);
  }

  renderListGroup = items => {
    if (!Array.isArray(items)) return null;

    return (
      <ListGroup className="list-group-root">
        {items.map(item => {        

          return item.children
          ? (
            <React.Fragment key={item.key}>
              <ListGroup.Item  active={item.active}>
                <FontAwesomeIcon icon={item.open ? faAngleDown : faAngleRight} className="expander" onClick={() => this.toggleOpenStatus(item.key)} />
                <FontAwesomeIcon icon={item.open ? faFolderOpen : faFolder} className="icon" />
                <span onClick={() => this.selectItem(item.key)}>{item.title}</span>
              </ListGroup.Item>
              <Collapse in={item.open}>
                {this.renderListGroup(item.children)}
              </Collapse>
            </React.Fragment>
          ) : (
            <ListGroup.Item key={item.key} active={item.active}>
              <FontAwesomeIcon icon={faMinus} className="placeholder" />
              <FontAwesomeIcon icon={faFile} className="icon" />
              <span onClick={() => this.selectItem(item.key)}>{item.title}</span>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    )
  }

  render() {
    return this.renderListGroup(this.model.data);
  }
}